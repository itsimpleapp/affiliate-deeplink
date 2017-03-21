/**
 * @see http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
 */
var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();

/**
 * @see http://locutus.io/php/url/urlencode/
 */ 
function urlencode (str) {
  str = (str + '')

  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+')
}

document.addEventListener('DOMContentLoaded', function(){
    if(localStorage["affsettings"]){
        var settings = JSON.parse(localStorage["affsettings"]);
         
        //Zanox
        if(!settings.zanox.connectid){
            document.getElementById("zanox").innerHTML = "ConnectID não configurado."; 
        }
        else if(!settings.zanox.adspace){
            document.getElementById("zanox").innerHTML = "Adspace não configurado."; 
        }
        else{            
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://toolbox.zanox.com/tools/api/deeplink?connectid="+settings.zanox.connectid+"&format=json&adspaceid="+settings.zanox.adspace+"&url="+urlencode(QueryString.url), false);

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){   
                    if(xhr.status == 200){
                        resp = JSON.parse(xhr.response);

                        if (resp == null)
                            document.getElementById("zanox").innerHTML = "Erro ao se conectar a Zanox.";    
                        else if(resp.url !== "")
                            document.getElementById("zanox").innerHTML = resp.url;
                        else if(resp.error == "4")
                            document.getElementById("zanox").innerHTML = "Mais de um programa foi encontrado com a URL atual, infelizmente não será possível gerar o link."; 
                        else if(resp.error == "5")
                            document.getElementById("zanox").innerHTML = "Sem autorização no programa.";    
                        else
                            document.getElementById("zanox").innerHTML = "Link inválido para este programa."; 
                    }
                }
            };

            xhr.send(null);
        }
        
        //Lomadee
        if(settings.lomadee.sourceid){
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "http://bws.buscape.com/service/createLinks/lomadee/3651516a44624e526551453d/?sourceId="+settings.lomadee.sourceid+"&format=json&link1="+urlencode(QueryString.url), false);

            xhr2.onreadystatechange = function(){
                if(xhr2.readyState == 4){   
                    if(xhr2.status == 200){
                        resp = JSON.parse(xhr2.response);

                        /**
                         * Status coletados do Lomadizador
                         * @see https://chrome.google.com/webstore/detail/lomadizador-de-links/cknblpomlcogconbiooomhnpdcndhjjj?hl=pt-BR
                         */
                        if (resp == null)
                            document.getElementById("lomadee").innerHTML = "Erro ao se conectar no Lomadee.";       
                        else if (resp.lomadeelinks[0].lomadeelink.code == 0)	
                            document.getElementById("lomadee").innerHTML = resp.lomadeelinks[0].lomadeelink.redirectlink;
                        else if (resp.details.code == 501)
                            document.getElementById("lomadee").innerHTML = "SourceId inválido.";                   
                        else
                            document.getElementById("lomadee").innerHTML = "Link inválido para este programa.";
                    }
                }
            };

            xhr2.send(null);
        }
        else{
            document.getElementById("lomadee").innerHTML = "SourceID não configurado.";
        }
        
        //Afiliados B2W
        var URLSB2W = ['', 'submarino.com.br', 'shoptime.com.br', 'soubarato.com.br'];
                
        if(!settings.afiliados.fraq)
            document.getElementById("afiliados").innerHTML = "FRANQ não configurado.";
        if(/americanas.com.br/i.test(QueryString.url))
            document.getElementById("afiliados").innerHTML = QueryString.url + ((/\?/i.test(QueryString.url)) ? "&" : "?") + "franq="+settings.afiliados.fraq+"&opn=AFLACOM";
        else if(/submarino.com.br/i.test(QueryString.url))
            document.getElementById("afiliados").innerHTML = QueryString.url + ((/\?/i.test(QueryString.url)) ? "&" : "?") + "franq="+settings.afiliados.fraq+"&opn=AFLNOVOSUB";
        else if(/shoptime.com.br/i.test(QueryString.url))
            document.getElementById("afiliados").innerHTML = QueryString.url + ((/\?/i.test(QueryString.url)) ? "&" : "?") + "franq="+settings.afiliados.fraq+"&opn=AFLSHOP&loja=01";
        else if(/soubarato.com.br/i.test(QueryString.url))
            document.getElementById("afiliados").innerHTML = QueryString.url + ((/\?/i.test(QueryString.url)) ? "&" : "?") + "franq="+settings.afiliados.fraq+"&opn=VVOERJTJ&loja=07";
        else
            document.getElementById("afiliados").innerHTML = "Link inválido para este programa.";
                        
        //Rakuten
        if(settings.rakuten.id){
            var storesRakuten = {"carrefour.com.br": 41880, "satina.com.br": 41834, "westwing.com.br": 41806, "flamengoloja.com.br": 41780, "lojapapi.com.br": 41764, "seriloncrafts.com.br": 41736, 
                                 "lojaiplace.com.br": 41720, "luizabarcelos.com.br": 41607, "casafortaleza.com.br": 41587, "madeiramadeira.com.br": 41540, "petmeupet.com.br": 41501, 
                                 "taqi.com.br": 41500, "lojaoz.com.br": 41481, "dbestshop.com.br": 41385, "netshoes.com.br": 41212, "zattini.com.br": 41254, "sepha.com.br": 41184,
                                 "sephora.com.br": 41116, "marisa.com.br": 41118, "walmart.com.br": 41032, "hp.com": 40940, "shopfacil.com.br": 40928, "okulos.com.br": 40876, "livrariacultura.com.br": 40684, 
                                 "santafina.com.br": 40634, "ray-ban.com": 40586, "petitebox.com.br": 40588, "sunglasshut.com": 40590, "ayrtonsenna.com.br": 40578, "chefsclub.com.br": 40576, "petlove.com.br": 40560, 
                                 "posthaus.com.br": 40540, "viadesejo.com.br": 40472, "elare.com.br": 40444, "kobo.com": 40380, "giulianaflores.com.br": 40272, "nike.com.br": 40168, "versaomasculina.com.br": 40170, 
                                 "martinsfontespaulista.com.br": 40032, "passarela.com.br": 39972, "glambox.com.br": 39970, "ricardoeletro.com.br": 39922, "centauro.com.br": 39887}
                             
            for(var keyR in storesRakuten){
                var regex = new RegExp(keyR, "i");
                
                if(regex.test(QueryString.url)){
                    var rakutenStoreID = storesRakuten[keyR];
                    
                    var xhr3 = new XMLHttpRequest();
                    xhr3.open("GET", "http://click.linksynergy.com/deeplink?id="+settings.rakuten.id+"&mid="+rakutenStoreID+"&murl="+urlencode(QueryString.url), true);

                    xhr3.onreadystatechange = function(){
                        if(xhr3.status == 200){
                            document.getElementById("rakuten").innerHTML = "http://click.linksynergy.com/deeplink?id="+settings.rakuten.id+"&mid="+rakutenStoreID+"&murl="+urlencode(QueryString.url);
                            document.getElementById("rakutenstoreid").innerHTML = ": " + rakutenStoreID;
                        }
                        else if(xhr3.status == 400){
                            if(/no relationship with merchant/i.test(xhr3.response))
                                document.getElementById("rakuten").innerHTML = "Sem autorização no programa."; 
                        }
                        else{
                            document.getElementById("rakuten").innerHTML = "Link inválido para este programa.";
                        }
                    };
                    
                    xhr3.send(null);
            
                    break;
                }
            }     
            
            setTimeout(function(){ if(document.getElementById("rakuten").innerHTML == "Carregando...") document.getElementById("rakuten").innerHTML = "Link inválido para este programa."; }, 4000);
        }
        else{
            document.getElementById("rakuten").innerHTML = "Link inválido para este programa.";
        }
        
        //Afilio
        if(!settings.afilio.token){
            document.getElementById("afilio").innerHTML = "Token não configurado.";
        }
        else if(!settings.afilio.affid){
            document.getElementById("afilio").innerHTML = "AffID não configurado.";
        }
        else if(!settings.afilio.siteid){
            document.getElementById("afilio").innerHTML = "SiteID não configurado.";
        }
        else{
            var storesAfilio = {"walmart.com.br": 191, "polishop.com.br": 357, "centauro.com.br": 382, "latam.com": 483, "shopfato.com.br": 573, "netshoes.com.br": 577,
                                "cvc.com.br": 610, "mobly.com.br": 764, "pontofrio.com.br": 768, "extra.com.br": 769, "casasbahia.com.br": 770, "rihappy.com.br": 928,
                                "fastshop.com.br": 994, "submarino.com.br": 1008, "shoptime.com.br": 1009, "americanas.com.br": 1010, "oqvestir.com.br": 1086, 
                                "epocacosmeticos.com.br": 1102, "thebeautybox.com.br": 1123, "lojaskd.com.br": 1134, "cantao.com.br": 1171, "posthaus.com.br": 1187,
                                "livrariacultura.com.br": 1190, "onofreagora.com.br": 1222, "wine.com.br": 1225, "boticario.com.br": 1255, "hopelingerie.com.br": 1260,
                                "eudora.com.br": 1318, "supermuffato.com.br": 1326, "quemdisseberenice.com.br": 1329, "megamamute.com.br": 1509, "offpremium.com.br": 1534,
                                "fyistore.com.br": 1536, "animale.com.br": 1537, "ikesaki.com.br": 1606, "divinoamor.com.br": 1601, "rede.natura.net": 1604, "pontofrioatacado.com.br": 1619,
                                "trocafone.com": 1672, "cea.com.br": 1678, "balaodainformatica.com.br": 1681, "afabula.com.br": 1701, "onofre.com.br": 1719, "madeiramadeira.com.br": 1885,
                                "colombo.com.br": 1739, "emporio.com": 1754, "zattini.com.br": 1785, "shopfacil.com.br": 1796, "sephora.com.br": 1926, "mercatto.com.br": 1830,
                                "chicorei.com": 1944, "taqi.com.br": 1950, "friboi.com.br": 1951, "bobstore.com.br": 1959, "carrefour.com.br": 2001};
            
            for(var keyAf in storesAfilio){
                var regex = new RegExp(keyAf, "i");
                
                if(regex.test(QueryString.url)){
                    var afilioStoreID = storesAfilio[keyAf];
                    var xhr4 = new XMLHttpRequest();
                    xhr4.open("GET", "http://v2.afilio.com.br/api/deeplink.php?token="+settings.afilio.token+"&affid="+settings.afilio.affid+"&progid="+afilioStoreID+"&bantitle=deeplink&bandesc=deeplink&siteid="+settings.afilio.siteid+"&desturl="+urlencode(QueryString.url), true);

                    xhr4.onreadystatechange = function(){
                        if(xhr4.status == 200){
                            try{
                                parser = new DOMParser();
                                xmlDoc = parser.parseFromString(xhr4.responseText, "text/xml");
                                document.getElementById("afilio").innerHTML = xmlDoc.getElementsByTagName("link")[0].childNodes[0].nodeValue.match(/href=[\'\"](.*?)[\'\"]/)[1];
                                document.getElementById("afiliostoreid").innerHTML = ": " + afilioStoreID;
                            }
                            catch(e){
                                document.getElementById("afilio").innerHTML = "Link inválido para este programa.";
                            }
                        }
                        else{
                            document.getElementById("afilio").innerHTML = "Link inválido para este programa.";
                        }
                    };
                    
                    xhr4.send(null);            
                    break;
                }
            } 
            
            setTimeout(function(){ if(document.getElementById("afilio").innerHTML === "Carregando...") document.getElementById("afilio").innerHTML = "Link inválido para este programa.";  }, 4000); 
        }
        
        //Actionpay
        if(!settings.actionpay.apikey){
            document.getElementById("actionpay").innerHTML = "API Key configurado.";
        }
        else{                        
            var storesActionpay = {"walmart.com.br": 8141, "mobly.com.br": 4045, "hotelurbano.com": 8333, "br.strawberrynet.com": 6548, "ericdress.com": 6464, "oqvestir.com.br": 8145, "suplementosforma.com.br": 8022,
                                   "latam.com": 5867, "catho.com.br": 6781, "rafarillo.com.br": 7967, "netdecor.com.br": 7871, "casasbahia.com.br": 7638, "pontofrio.com.br": 7628, "extra.com.br": 7630, 
                                   "mariavittoria.com.br": 7786, "posthaus.com.br": 7787, "babbel.com": 7670, "choies.com": 6310, "eventualstore.com.br": 7624, "denunciastore.com.br": 7623, 
                                   "osmozestore.com.br": 7622, "corpoperfeito.com.br": 5260, "supermuffato.com.br": 4181, "itstone.com.br": 7311, "arrazofashion.com.br": 7462, "bestberry.com.br": 7478, 
                                   "marisa.com.br": 7460, "doural.com.br": 5263, "polishop.com.br": 5319, "zattini.com.br": 7328, "nike": 7254, "emporiodacerveja": 6188, "pandora joias": 6814,
                                   "loft 747": 6853, "nature.com.br": 6551, "soulier.com.br": 6724, "glambox.com.br": 5714, "luciafigueredo.com.br": 6574, "madeiramadeira.com.br": 6550, "schumann.com.br": 6173, 
                                   "outershoes.com.br": 6335, "boasaudesuplementos.com.br": 6508, "dbestshop.com.br": 5990, "br.ikariam.gameforge.com": 6497, "shopfacil.com.br": 6492, "abramais.com.br": 6480, 
                                   "abracasa.com.br": 6479, "abracadabra.com.br": 6456, "parperfeito.com.br": 4748, "unikapharma.com.br": 6352, "amazon.com.br": 5221, "myspirit.com.br": 6285, "mindesigns.com.br": 6036, 
                                   "fleurity.com.br": 6277, "ladyhairpro.com.br": 5164, "lojaspompeia.com": 4788, "anita.com.br": 5784, "bololo.com.br": 5598, "malaamada.com.br": 6212, "lekssa.com.br": 6205, 
                                   "tamarindos.com.br": 6180, "petitebox.com.br": 5542, "oakley.com.br": 6074, "pecadille.com.br": 6075, "montecarlo.com.br": 6050, "thebeerplanet.com.br": 5937,
                                   "lealtexonline.com.br": 5879, "cea.com.br": 5796, "ateen.com.br": 5763, "calcadosonline.com.br": 5734, "shoptime.com.br": 5631, "submarino.com.br": 5602, "americanas.com.br": 5457, 
                                   "centauro.com.br": 4492, "cantao.com.br": 5098, "lithocalcium.com.br": 5368, "okulos.com.br": 5362, "relogiosoversized.com.br": 5305, "bioextratus.com.br": 5215, "netshoes.com.br": 5026, 
                                   "laris.com.br": 4803, "netnails.com.br": 4696, "aliexpress.com": 4044, "shop4men.com.br": 4647, "dx.com": 4100, "banggood.com": 7482, "alibaba.com": 4703};
            
            for(var keyAc in storesActionpay){
                var regex = new RegExp(keyAc, "i");
                
                if(regex.test(QueryString.url)){  
                    var actionpayStoreID = storesActionpay[keyAc];
                    
                    var xhr5 = new XMLHttpRequest();
                    xhr5.open("GET", "http://actionpay.net/ru/apiWmLinks/?key=" + settings.actionpay.apikey + "&format=json&offer="+actionpayStoreID, true);

                    xhr5.onreadystatechange = function(){
                        if(xhr5.status == 200){
                            var contentsJSON = JSON.parse(xhr5.responseText);
                            
                            if(contentsJSON.error){
                                if(contentsJSON.error.code == 403)
                                    document.getElementById("actionpay").innerHTML = "Sem autorização no programa.";
                                                                
                            }
                            else{
                                for(var key2 in contentsJSON.result.links){
                                    if(/url\=/img.test(contentsJSON.result.links[key2].url)){
                                        document.getElementById("actionpaystoreid").innerHTML = ": " + actionpayStoreID;
                                        document.getElementById("actionpay").innerHTML = contentsJSON.result.links[key2].url.replace("example.com", urlencode(QueryString.url));
                                        break;
                                    }
                                }

                                setTimeout(function(){ if(document.getElementById("actionpay").innerHTML === "Carregando...") document.getElementById("actionpay").innerHTML = "A loja não possui deeplink dinâmico";  }, 4000); 
                            }
                        }
                        else{
                            document.getElementById("actionpay").innerHTML = "Link inválido para este programa.";
                        }
                    };
                    
                    xhr5.send(null); 
                }
            }
            
            setTimeout(function(){ if(document.getElementById("actionpay").innerHTML === "Carregando...") document.getElementById("actionpay").innerHTML = "Link inválido para este programa.";  }, 4000); 
        }
        
        //Cityads
        if(!settings.cityads.remoteauth){
            document.getElementById("cityads").innerHTML = "Remote auth não configurado.";
        }
        else{  
            var storesCityads = {"abouthome.com.br": 27460, "abracasa.com.br": 27587, "abramais.com.br": 27586, "abracadabra.com.br": 27585, "aguadocepraia.com.br": 27753, "alibaba.com": 18315, "aliexpress.com": 4325,
                                 "allbags.com.br": 8975, "amissima.com.br": 12505, "amomuito.com": 8065, "anita.com.br": 18015, "astro7.ru": 2935, "balaodainformatica.com.br": 20405, "banggood.com": 4735, "thebeautybox.com.br": 25365,
                                 "bebestore.com.br": 21035, "berrybenka.com": 27987, "bijoulux.com.br": 27374, "brastemp.com.br": 23095, "basicacompimenta.com.br": 27111, "cea.com.br": 27005, "camisariacolombo.com.br": 21735,
                                 "capitollium.com.br": 15915, "carrefour.com.br": 27714, "casabaher.com": 27449, "casasbahia.com.br": 9505, "centauro.com.br": 6045, "centralfit.com.br": 8965, "ciamaritima.com.br": 27752, "clickbus.com.br": 7755, 
                                 "compracerta.com.br": 16865, "constance.com.br": 14795, "consul.com.br": 23105, "darwin6.com.br": 27311, "dbestshop.com.br": 27453, "dx.com": 4855, "booking.com": 20205, "degraucultural.com.br": 27310, 
                                 "doural.com.br": 28367, "drshapesuplementos.com.br": 27926, "dresslily.com": 28514, "drogaraia.com.br": 27993, "drogariasaopaulo.com.br": 27715, "drogariaspacheco.com.br": 27721, "drogasil.com.br": 27994, 
                                 "duloren.com.br": 27713, "elo7.com.br": 22025, "estrela10.com.br": 27283, "etiquetaunica.com.br": 27178, "extra.com.br": 9525, "fairyseason.com": 28442, "fashionmia.com": 27927, "flaminga.com.br": 20115, 
                                 "fdmoficial.com.br": 26745, "galvic.com.br": 27017, "gearbest.com": 23505, "graogourmet.com": 25535, "hopelingerie.com.br": 27520, "hotelurbano.com": 10895, "hoteis.com": 27999, "kitchenaid.com.br": 27208, 
                                 "lenovo.com": 7835, "loft747.com.br": 26395, "lojadoprazer.com.br": 14185, "lojaeraumavez.com.br": 11925, "lojaprojetoverao.com.br": 17635, "lojavirus.com.br": 25035, "lojasec.com.br": 20925, "taqi.com.br": 27594,
                                 "luizabarcelos.com.br": 27655, "lumae.com.br": 19925, "marketfashion.com.br": 27598, "meseduza.com.br": 27467, "medicaldepartures.com": 27880, "mobly.com.br": 8175,
                                 "modanisa.com": 28203, "natura.net": 18235, "lojadointer.com.br": 10455, "mundopalmeiras.com.br": 10445, "shoptimao.com.br": 10305, "saopaulomania.com.br": 10295, "santosstore.com.br": 10435, 
                                 "shopcruzeiro.com.br": 17055, "shopvasco.com.br": 26355, "boticario.com.br": 25335, "okulos.com.br": 27678, "pandorajoias.com.br": 27483, "pbkids.com.br": 9145, "poemese.com": 13395, "pontofrio.com.br": 9495, 
                                 "rihappy.com.br": 8995, "salomaocountry.com.br": 14305, "sandromoscoloni.com.br": 8825, "sephora.com.br": 20905, "shop4men.com.br": 21475, "thenorthface.com.br": 10235, "thugnine.com.br": 26979, "walmart.com.br": 8335,
                                 "allbags.com.br": 8975, "allianz-assistance.com.br": 26815, "assine.abril.com.br": 27525, "netcombo.net": 27996, "ebookseuphoria.com": 27738, "thebeautybox.com.br": 25365, "bestofbeauty.com.br": 27658, 
                                 "michelmercier.bioextratus.com.br": 19455, "capitollium.com.br": 15915, "claro.com.br": 27718, "decolar.com": 20205, "e-lens.com.br": 11995, "ecid.com.br": 27571, "eduk.com.br": 19915, 
                                 "loja.embratelcloud.com.br": 27930, "portal.embratel.com.br": 27931, "follixin.com.br": 27277, "hijabenka.com": 28000, "kiwi.qa": 27156, "lobr.oasgames.com": 10585, "lingualeo.com": 27157, "linio.com.mx": 19715,
                                 "localiza.com": 23585, "modanisa.com": 28203, "momondo.com.br": 27452, "mpbrinquedos.com.br": 27473, "naturecenter.com.br": 27830, "netdecor.com.br": 27054,
                                 "newfrog.com": 6305, "organizeshop.com.br": 27519, "outershoes.com.br": 27572, "oxinovaoficial.com": 27278, "portaldabolsa.com.br": 27288,
                                 "qatarairways.com": 27038, "recarga.com": 21515, "rentalcars.com": 19665, "rosacha.com.br": 27582, "meu-imovel.com": 28345, "serenatanet.com.br": 28366,
                                 "skybandalarga.com.br": 28130, "skyscanner.com.br": 23215, "somatodrol.com.br": 27275, "servicos.terra.com.br/antivirus": 27806, "servicos.terra.com.br/backup": 27807,
                                 "construtor.terra.com.br": 27808, "servicos.terra.com.br/cursos": 27809, "lojavirtual.terra.com.br": 27810, "servicos.terra.com.br/nuvem-de-livros": 27811,
                                 "tim.com.br/TIM-Controle": 27719, "tim.com.br/Recarga_Express": 28142, "tripadvisor.com.br": 28359};
            
            for(var keyC in storesCityads){
                var regex = new RegExp(keyC, "i");
                
                if(regex.test(QueryString.url)){  
                    var cityadsStoreID = storesCityads[keyC];
                    
                    var xhr6 = new XMLHttpRequest();
                    xhr6.open("GET", "http://api.cityads.com/api/rest/webmaster/json/offer-links/" + cityadsStoreID + "?remote_auth=" + settings.cityads.remoteauth, true);

                    xhr6.onreadystatechange = function(){
                        if(xhr6.status == 200){
                            var contentsJSON = JSON.parse(xhr6.responseText);
                            
                            if(contentsJSON.status == 200){
                                for(var key2 in contentsJSON.data.items){
                                    if(contentsJSON.data.items[key2].is_default){
                                        document.getElementById("cityadsstoreid").innerHTML = ": " + cityadsStoreID;
                                        document.getElementById("cityads").innerHTML = contentsJSON.data.items[key2].deep_link+"?url="+urlencode(QueryString.url);
                                        break;
                                    }
                                }                      
                            }
                            else if(contentsJSON.status == 403){
                                document.getElementById("cityads").innerHTML = "Sem autorização no programa.";
                            }
                            else{
                                document.getElementById("cityads").innerHTML = "Link inválido para este programa.";
                            }
                        }
                        else{
                            document.getElementById("cityads").innerHTML = "Link inválido para este programa.";
                        }
                    };
                    
                    xhr6.send(null); 
                }
            }
            
            setTimeout(function(){ if(document.getElementById("cityads").innerHTML === "Carregando...") document.getElementById("cityads").innerHTML = "Link inválido para este programa.";  }, 4000); 
        }
    }
});




