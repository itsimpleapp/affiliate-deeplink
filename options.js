document.querySelector('#save').addEventListener('click', function(){
    localStorage["affsettings"] = JSON.stringify({
        zanox: {
            connectid: document.getElementById("zanoxconnectid").value,
            adspace: document.getElementById("zanoxadspace").value
        },
        lomadee: {
            sourceid: document.getElementById("lomadeesourceid").value
        },
        afiliados: {
            fraq: document.getElementById("afiliadosfraq").value
        },
        /*cityads: {
            masterlink: document.getElementById("cityadsmasterlink").value
        },*/
        afilio: {
            token: document.getElementById("afiliotoken").value,
            affid: document.getElementById("afilioaffid").value,
            siteid: document.getElementById("afiliositeid").value
        },
        rakuten: {
            id: document.getElementById("rakutenid").value
        },
        actionpay: {
            apikey: document.getElementById("actionpayapikey").value
        },
        cityads: {
            remoteauth: document.getElementById("cityadsremoteauth").value
        }
    });

    alert("Os dados foram salvos com sucesso!");
    window.close();
});

document.addEventListener('DOMContentLoaded', function(){
    if(localStorage["affsettings"]){
        var settings = JSON.parse(localStorage["affsettings"]);
          
        document.getElementById("zanoxconnectid").value = settings.zanox.connectid;
        document.getElementById("zanoxadspace").value = settings.zanox.adspace;        
        document.getElementById("lomadeesourceid").value = settings.lomadee.sourceid;        
        document.getElementById("afiliadosfraq").value = settings.afiliados.fraq;               
        document.getElementById("afiliotoken").value = settings.afilio.token;
        document.getElementById("afilioaffid").value = settings.afilio.affid;
        document.getElementById("afiliositeid").value = settings.afilio.siteid;
        document.getElementById("rakutenid").value = settings.rakuten.id;
        document.getElementById("actionpayapikey").value = settings.actionpay.apikey;
        document.getElementById("cityadsremoteauth").value = settings.cityads.remoteauth;
    }
});