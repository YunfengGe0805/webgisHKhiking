// 使用 JavaScript 动态加载选项到 datalist
    fetch('./get_routename.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('routeList').innerHTML = data;
        })
        .catch(error => console.error('Error loading route list:', error));

    fetch('./get_regionname.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('regionList').innerHTML = data;
        })
        .catch(error => console.error('Error loading region list:', error));

    fetch('./get_attname.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('attractionList').innerHTML = data;
        })
        .catch(error => console.error('Error loading attraction list:', error));
    
    fetch('./get_bbqname.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('bbqList').innerHTML = data;
        })
        .catch(error => console.error('Error loading bbq list:', error));

    fetch('./get_campname.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('campList').innerHTML = data;
        })
        .catch(error => console.error('Error loading camp list:', error));

    fetch('./get_viewname.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('viewList').innerHTML = data;
        })
        .catch(error => console.error('Error loading viewpoint list:', error));

