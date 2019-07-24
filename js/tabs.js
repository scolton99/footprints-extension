const openInTabs = () => {
    window._goPage = (type, mr, project, extraCGI) => {
        var thisUrl = (type == 'details') ? detailsBaseURL : editBaseUrl;
        thisUrl += "&MR=" + mr;
        if (project == null)
           project = 1;
        thisUrl += "&PROJECTID=" + project;
        if (extraCGI)
            thisUrl += "&" + extraCGI;
        
        thisUrl += "&RUNNING_IN_POPUP=1";
        var randomize = Math.ceil(Math.random() * 1000);
        var winName = type + mr + randomize;
        window.open(thisUrl, winName);
    };

    window.goToCreate = (project, extraCGI) => {
        const MRP = /(?:^|&|\?)MRP=(.*?)(?:&|$)/g.exec(detailsBaseURL)[1];
        const lastID = /(?:^|&|\?)LASTID=(.*?)(?:&|$)/g.exec(detailsBaseURL)[1];
        const user = /(?:^|&|\?)USER=(.*?)(?:&|$)/g.exec(detailsBaseURL)[1];

        var url = `/MRcgi/MRTicketPage.pl?MAJOR_MODE=CREATE&LASTID=${lastID}&USER=${user}&MRP=${MRP}`;
        url += '&PROJECTID=' + project;
        if (extraCGI)
           url += "&" + extraCGI;

        url += "&RUNNING_IN_POPUP=1";
        var randomize = Math.ceil(Math.random() * 1000);
        var winName = 'Create' + randomize;
        window.open(url, winName); 
    };

    window.submitQuickSearch = () => {
        document.quickSearch.SEARCHS.value = document.quickSearch.SEARCHS.value.replace(/^\s+|\s+$/g, '');
        var searchValue = document.quickSearch.SEARCHS.value;

        if (!searchValue || !searchValue.match(/\S/))
           return;

        if (document.quickSearch.WSEARCH.value == 'NAMP') {
           showNumaraAmpSearchWindow(searchValue);
           return;
        }

        // detect numeric input
        // one number, no delimiters. Just load details page. No form submit.
        if (searchValue.match(/^\d+$/)) {

           var number = parseInt(searchValue, 10);
           if (number < 1)
              return alert('All Issue numbers must be positive integers.');

            const MRP = /(?:^|&|\?)MRP=(.*?)(?:&|$)/g.exec(detailsBaseURL)[1];
            const user = /(?:^|&|\?)USER=(.*?)(?:&|$)/g.exec(detailsBaseURL)[1];
            const projectid = document.getElementsByName("PROJECTID")[0].value;


           var url  = `/MRcgi/MRTicketPage.pl?USER=${user}&PROJECTID=${projectid}&MRP=${MRP}&MAXMININC=&MAJOR_MODE=DETAILS&RUNNING_IN_POPUP=1`;
           url += '&MR=' + number;

           window.open(url, 'details' + number);

           return;
        }
        else if (searchValue.match(/^(\d+,*\s*)+$/)) {

           // in case spaces used as delimeter switch space to comma
           searchValue = searchValue.replace(/,?\s+/g, ',');
           var nums = searchValue.split(',');
         
           // eliminate nulls from the results of the split
           var goodNums = new Array();
           for (var i = 0; i < nums.length; i++)
              if (nums[i] > 0)
                 goodNums.push(nums[i]);
           searchValue = goodNums.join(',');      

           document.quickSearch.WSEARCH.value = 'NUM';
           appendHidden(document.quickSearch, 'MR', searchValue);
        }
        else if (document.quickSearch.WSEARCH.value == 'ASSIGNEE') {
           appendHidden(document.quickSearch, 'ASSIGNEDTO', searchValue );
        }
        else if (document.quickSearch.WSEARCH.value == 'TITLE') {
           appendHidden(document.quickSearch, 'TITLE', searchValue);
        }
        else if (document.quickSearch.WSEARCH.value == 'KEYWORD') {
           appendHidden(document.quickSearch, 'KEYWORDPHRASE', searchValue);
        }
        else if (document.quickSearch.WSEARCH.value == 'SLB_CUSTOM_ISSUE_NUMBER') {
           // we are searching on SLB_CUSTOM_ISSUE_NUMBER and it must be an int
           if (isNaN(searchValue))
              return alert("Please enter a positive integer number");
           // further treatment of the search string will occur after form is submitted
        }
        else if (document.quickSearch.WSEARCH.value == 'CUSTOM') {
           null;
           // further treatment of the search string will occur after form is submitted
        }

        document.quickSearch.submit();
     };
};

openInTabs();