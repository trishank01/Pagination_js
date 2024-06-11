document.addEventListener("DOMContentLoaded", function () {
  const app = document.querySelector(".app");
  let products = [];
  let page = 1;

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        products = data.products;
        console.log(products);
        render();
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const render = () => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("products");
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");


    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((prod) => {
        const productElement = document.createElement("div");
        productElement.classList.add("proucts_single");
        productElement.innerHTML = `
                <img src="${prod.thumbnail}" alt="${prod.title}"/>
                <span>${prod.title}</span>
                `;
        productContainer.appendChild(productElement);
      });
     
      if (page > 1) {
        const prevButton = createPaginationButton("⏮️", () => {
          selectPagination(page - 1);
        });
        pagination.appendChild(prevButton)
      }

    //   number buttons
    for (let i = 0; i < products.length / 10; i++) {
        const pageButton = createPaginationButton(i + 1, () => {
            selectPagination(i + 1);
          },
          page === i + 1
        );
          pagination.appendChild(pageButton)
        
    }


    // next buttons
    if (page < products.length / 10) {
        const nextButton = createPaginationButton("⏭️", () => {
          selectPagination(page + 1);
        });
        pagination.appendChild(nextButton)
      }
    }
    app.innerHTML = ""
    app.appendChild(productContainer);
    app.appendChild(pagination);
  };

  const createPaginationButton = (text , clickHandler , isSelected=false) => {
    const button = document.createElement("button")
    button.textContent = text;
    button.addEventListener("click" , clickHandler)
    if(isSelected){
        button.classList.add("pagination_selected")
       
    }
    return button
  };

  const selectPagination = (selectPage) => {
   if(selectPage >= 1 && selectPage <= products.length/10 && selectPage !== page ){
    page = selectPage
    render()
   }
  }


 
  fetchProducts();
});
