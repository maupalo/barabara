
var express = require('express');
var router = express.Router();
const puppeteer=require('puppeteer');
const fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  


  (async () => {

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com.mx/');

    await page.type('#twotabsearchtextbox', req.query.q);
    await page.click('#nav-search-submit-button')

    await page.waitForNavigation()
    //await page.screenshot({path: './public/images/amazon.jpg'})

    // await page.waitForSelector('[data-csa-c-type=item]')
    // await page.screenshot({path: './public/images/image/test3.jpg'})
    
    
    //Contar elementos
    let procesadores = [];
    
    var lista = await page.evaluate(()=>{
      
      //Consigue los precios
      let i=0;
      var precios = document.querySelectorAll('span.a-price-whole');
      let arrayprices=[]
      let stringprecio
      let numprecio
      let anuncio = false;
      for(let precio of precios){
        
        if(i<=4){
          stringprecio=precio.textContent+"00"
          stringprecio = stringprecio.replace(",", "");
          numprecio= parseFloat(stringprecio)
          arrayprices.push(numprecio);
        }
        i++;
        
      }

      //
      i=0
      let arrayimg=[]
      var images = document.querySelectorAll('div.a-section > img.s-image');
      for(let image of images){
        
        if(i<=4 ){
          arrayimg.push(image.src);
        }
        i++;
        
      }
      //consigue los links.
      const elements = document.querySelectorAll('h2.a-size-mini > a.a-link-normal');
      var elementos = [];
      i=0;

      for(let elem of elements){
        if(i<=4){
          if (elem.href!='javascript:void(0)' && !elementos.includes(elem.href)){
            elementos.push({
              link: elem.href,
              image: arrayimg[i],
              price: arrayprices[i]
            });
            i++;
          }
        }
        
        
        
        
      }
      elementos.sort((a, b) => a.price - b.price);
      return elementos;
    });
    console.log(lista)
    await page.goto('https://www.mercadolibre.com.mx/');
    await page.waitForSelector('#cb1-edit');
    await page.type('#cb1-edit', req.query.q);
    await page.click('button.nav-search-btn')
await page.waitForSelector('#cb1-edit')
    var listaML = await page.evaluate(()=>{
      
      //Consigue los precios
      let i=0;
      var precios = document.querySelectorAll('span.price-tag-fraction');
      let arrayprices=[]
      let stringprecio
      let numprecio
      let anuncio = false;
      for(let precio of precios){
        
        if(i<=3){
          stringprecio=precio.textContent
          stringprecio = stringprecio.replace(",", "");
          numprecio= parseFloat(stringprecio)
          arrayprices.push(numprecio);
        }
        i++;
        
      }

      //
      i=0
      let arrayimg=[]
      var images = document.querySelectorAll('img.ui-search-result-image__element');
      for(let image of images){
        
        if(i<=3 ){
          arrayimg.push(image.src);
        }
        i++;
        
      }
      //consigue los links.
      const elements = document.querySelectorAll('a.ui-search-item__group__element');
      var elementos = [];
      i=0;

      for(let elem of elements){
        if(i<=3){
          if (true){
            elementos.push({
              link: elem.href,
              image: arrayimg[i],
              price: arrayprices[i]
            });
            i++;
          }
        }
        
        
        
        
      }
      elementos.sort((a, b) => a.price - b.price);
      return elementos;
    });
    console.log(listaML)

//     await page.waitForNavigation()

// //await page.waitForSelector("span.price-tag-fraction")
// console.log("pasó await")
//     var listaML = await page.evaluate(()=>{
      
//       //Consigue los precios
//       let i=0;
//       var precios = document.querySelectorAll('span.price-tag-fraction');
//       console.log("PrecioML"+precios)
//       let arraypricesML=[]
//       let stringprecio
//       let numprecio
//       for(let precio of precios){
        
//         if(i<=4){
//           stringprecio=precio.textContent+".00"
//           stringprecio = stringprecio.replace(",", "");
//           numprecio= parseFloat(stringprecio)
//           arraypricesML.push(numprecio);
//         }
//         i++;
        
//       }
//       console.log("array prices ml ")

//       //
//       i=0
//       let arrayimgML=[]
//       var images = document.querySelectorAll('img.ui-search-result-image__element');
//       for(let image of images){
        
//         if(i<=4 ){
//           arrayimgML.push(image.src);
//         }
//         i++;
        
//       }
//       console.log(arrayimgML)
//       //consigue los links.
//       const elementsML = document.querySelectorAll('a.ui-search-item__group__element');
//       var elementosML = [];
//       i=0;

//       for(let elem of elementsML){
//         if(i<=4){
//           if (!elementosML.includes(elem.href)){
//             elementosML.push({
//               link: elem.href,
//               image: arrayimgML[i],
//               price: arraypricesML[i]
//             });
//             i++;
//           }
//         }
//       }
//       elementosML.sort((a, b) => a.price - b.price);
//       return elementosML;
//     });
//     console.log(listaML)
    

await page.goto('https://www.claroshop.com/');
    await page.waitForSelector('#inputBusqueda');
    await page.type('#inputBusqueda', req.query.q);
    await page.click('button.btn')
    await page.waitForSelector('#inputBusqueda')

    var listaCS = await page.evaluate(()=>{
      
      //Consigue los precios
      let i=0;
      var precios = document.querySelectorAll('p.precio1');
      let arrayprices=[]
      let stringprecio
      let numprecio
      let anuncio = false;
      for(let precio of precios){
        
        if(i<=4){
          stringprecio=precio.textContent
          stringprecio = stringprecio.replace("$", "");
          stringprecio = stringprecio.replace(",", "");
          numprecio= parseFloat(stringprecio)
          arrayprices.push(numprecio);
        }
        i++;
        
      }

      //
      i=0
      let arrayimg=[]
      var images = document.querySelectorAll('div.LazyLoad > img');
      for(let image of images){
        
        if(i<=4 ){
          arrayimg.push(image.src);
        }
        i++;
        
      }
      //consigue los links.
      const elements = document.querySelectorAll('article.cardProduct > a');
      var elementos = [];
      i=0;

      for(let elem of elements){
        if(i<=4){
          if (true){
            elementos.push({
              link: elem.href,
              image: arrayimg[i],
              price: arrayprices[i]
            });
            i++;
          }
        }
        
        
        
        
      }
      elementos.sort((a, b) => a.price - b.price);
      return elementos;
    });
    console.log(listaCS)

    function findIndexOfSmallestElement(array) {
      if (array.length === 0) {
        return -1; // Return -1 if the array is empty
      }
    
      let smallest = array[0];
      let smallestIndex = 0;
    
      for (let i = 1; i < array.length; i++) {
        if (array[i] < smallest) {
          smallest = array[i];
          smallestIndex = i;
        }
      }
    
      return smallestIndex;
    }
    
    // Example usage:
    const numbers = [lista[0].price, listaML[0].price*12, listaCS[0].price];
    const index = findIndexOfSmallestElement(numbers);
    console.log("Index of smallest element:", index); // Output: 3
    let smallestStore="";
    switch(index){
      case 0:
        smallestStore="Amazon"
        break;
        case 1:
          smallestStore="Mercado Libre"
          break;
          case 2:
            smallestStore="Claro Shop"
            break;
            default:
              smallestStore="Ninguna, bola de careros"


    }

    res.render('resultados', { title: 'test.jpg', 
    imgamazon: lista[0].image,
      priceAmazon: lista[0].price,
      linkAmazon: lista[0].link,
      imgML: listaML[0].image,
      priceML: listaML[0].price*12,
      linkML: listaML[0].link,
      imgCS: listaCS[0].image,
      priceCS: listaCS[0].price,
      linkCS: listaCS[0].link,
      cheaper: smallestStore
    });
    await browser.close();
  })();
});




module.exports = router;
