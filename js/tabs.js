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
};

openInTabs();