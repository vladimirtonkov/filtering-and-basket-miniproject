const ButtonsProducts = document.querySelectorAll('.store__item-btn')
const ProductElements = document.querySelectorAll('.store__product')
const search = document.querySelector('.store__search-wrap')
const DataInput = document.querySelector('.store__search-input')
const BasketsButtons = document.querySelectorAll('.store__product-basket')
const numberGoods = document.querySelector('.basket__number-goods .number')

const InfoProduct = document.querySelector('.store__block')

let arr = []
let sumGoods = 0


ButtonsProducts.forEach(btn => btn.addEventListener('click', (event) => {
  // let name = event.target.textContent.toLowerCase()
  let name = event.target.dataset.btn.toLowerCase()
  InfoProduct.style.display = 'none'


  ProductElements.forEach(prod => {
    prod.classList.remove('hide-element')
    arr.push(prod.dataset.nameitem.toLowerCase())
  })

  ProductElements.forEach(elem => {

    let item = elem.dataset.nameitem.toLowerCase()

    if (!arr.includes(name)) {
      InfoProduct.style.display = 'block'
    }

    if (item === name) {

      elem.classList.remove('hide-element')
      InfoProduct.style.display = 'none'

    } else if (name === 'all') {

        ShowAllItems()
        InfoProduct.style.display = 'none'

    } else if (item !== name)  {

        elem.classList.add('hide-element')
    }
  })



}))


function ShowAllItems() {
  ProductElements.forEach(product => {
    product.classList.remove('hide-element')
  })
}


// ---- Все Работает, но можно еще протестировать --- /
//      что-то - изменить

DataInput.addEventListener('input' , (event) => {
  let text = event.target.value

  // ProductElements.forEach(prod => {
  //   prod.classList.remove('hide-element')
  // })

  if (text.trim().length === 0) {
    ProductElements.forEach(prod => {
      prod.classList.remove('hide-element')
    })
  } 
  // else {

  //     let str = text
  //     ProductElements.forEach(currentElem => {
  //       let element = currentElem.dataset.nameitem.toLowerCase()
  //       if (element.indexOf(str) === -1) {
  //         currentElem.classList.add('hide-element')
  //       }
  //   })

 // }

})



search.addEventListener('click', () => {
  let Data = DataInput.value

    ProductElements.forEach(prod => {
      prod.classList.remove('hide-element')
  })

  if (Data.trim().length !== 0) {
    // let str = Data.split(' ').join('')
    let str = Data

    ProductElements.forEach(currentElem => {
        let element = currentElem.dataset.nameitem.toLowerCase()
        if (element.indexOf(str) === -1) {
          currentElem.classList.add('hide-element')
        }
    })

  } else {

      ProductElements.forEach(prod => {
        prod.classList.remove('hide-element')

    })

  }


})




const amountGoods = document.querySelector('.basket__count span')
const ulElement = document.querySelector('.basket__items')
let minCount = 0

BasketsButtons.forEach(busket => busket.addEventListener('click', () => {


  let parent = busket.parentElement
  let price = parent.querySelector('.store__product-price span').textContent
  let name = parent.querySelector('.store__product-name').textContent
  let img = parent.querySelector('.store__product-img')


  ulElement.insertAdjacentHTML('beforeend', `
    <li class="basket__item">
        <div class="basket__inner">
          <img class="basket__img" src="${img.getAttribute('src')}" alt="">
          <img class="basket__delete" src="images/delete.png" alt="">
        </div>
        <div class="basket__content">
          <span class="basket__name">${name}</span>
          <span class="basket__price">$ <span>${price}</span></span>
        </div>
    </li>
  `)

 const DeleteProductBasket = document.querySelectorAll('.basket__delete')


  sumGoods += Number(price)

  amountGoods.innerHTML = sumGoods

  minCount = +(amountGoods.textContent)

  numberGoods.innerHTML = ulElement.children.length


  DeleteProductBasket.forEach(delProd => delProd.addEventListener('click', () => {
    let currentDelElement = delProd.closest('.basket__item')
    let minCurrPrice = currentDelElement.querySelector('.basket__price span').textContent



    //   - await...
    // удаляет нужный элемент , но
    // пока что не правильно считает конечную сумму
    minCount = minCount - Number(minCurrPrice)
    currentDelElement.remove()
    amountGoods.innerHTML = minCount

    // numberGoods.innerHTML = ulElement.childElementCount
    numberGoods.innerHTML = ulElement.children.length

      if (ulElement.childElementCount === 0) {
        sumGoods = 0
        minCount = 0
        amountGoods.innerHTML = 0

        numberGoods.innerHTML = 0
      }
  }))


}))



