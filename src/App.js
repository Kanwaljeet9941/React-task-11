import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const Items = [
  {
    id: 1,
    name: "L-super816",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 149,
    img: "1.jpg",
  },
  {
    id: 2,
    name: "M-312 Speed",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 129,
    img: "2.jpg",
  },
  {
    id: 3,
    name: "Mounza fleetsport",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 159,
    img: "3.jpg",
  },
  {
    id: 4,
    name: "ascis Women sports",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 169,
    img: "4.jpg",
  },
  {
    id: 5,
    name: "4-M14 G-ultra",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 139,
    img: "5.jpg",
  },
  {
    id: 6,
    name: "Snow Stan-9",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 129,
    img: "6.jpg",
  },
  {
    id: 7,
    name: "L-super12",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 120,
    img: "7.jpg",
  },
  {
    id: 8,
    name: "B12 Jump",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 130,
    img: "8.jpg",
  },
  {
    id: 9,
    name: "Flow+ M-4",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 178,
    img: "9.jpg",
  },
  {
    id: 10,
    name: "Super Flow",
    details: "soft insoles,light weight, better grip, soft leather",
    price: 124,
    img: "10.jpg",
  },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartElmt, setCartElmt] = useState([]);

  function handleClickCart() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  function handleAddCart(ele) {
    if (cartElmt.includes(ele)) return;
    setCartElmt((eles) => [...eles, ele]);
    setIsOpen(true);
  }

  function handleRemCart(ele) {
    setCartElmt((cartElmt) => {
      return cartElmt.filter((currEle) => currEle.id !== ele.id);
    });
  }

  return (
    <>
      <Navbar onClickCart={handleClickCart} />
      <Cart
        isOpen={isOpen}
        cartElmt={cartElmt}
        onRemEle={handleRemCart}
        onClickCart={handleClickCart}
      />
      <Home />
      <Products Items={Items} onAddCart={handleAddCart} isOpen={isOpen} />
    </>
  );
}

function Navbar({ onClickCart }) {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo-2.png" alt="lumen" />
      </div>

      <div className="nav-list">
        <ul>
          <li>Home</li>
          <li>Poducts</li>
          <li>
            <IoCartOutline onClick={onClickCart} />
          </li>
        </ul>
      </div>

      <div className="search">
        <input type="text" placeholder="Search" className="inp" />
      </div>
    </div>
  );
}

function Cart({ isOpen, cartElmt, onRemEle, onClickCart }) {
  return (
    <div className={`cart ${isOpen ? "" : "mover"}`}>
      {cartElmt.length === 0 ? (
        <h4 className="cart-empty-board">Nothing Yet!</h4>
      ) : (
        <div>
          <ul className="cart-list">
            {cartElmt.map((ele) => (
              <Cartlist ele={ele} onRemEle={onRemEle} key={ele.id} />
            ))}
          </ul>
          <div className="checkout">
            <button onClick={onClickCart}>checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Cartlist({ ele, onRemEle }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <li className="cart-list-item">
      <img
        src={ele.img}
        alt={ele.name}
        width="44px"
        style={{ borderRadius: "5px" }}
      />
      <p style={{ fontWeight: "600" }}>Price : ${quantity * ele.price}</p>
      <button
        className="btn"
        onClick={() => setQuantity((q) => (quantity > 1 ? q - 1 : q))}
      >
        -
      </button>
      <p style={{ fontWeight: "600" }}>{quantity}</p>
      <button
        className="btn"
        onClick={() => setQuantity((q) => (quantity < 12 ? q + 1 : q))}
      >
        +
      </button>
      <button className="btn-rem" onClick={() => onRemEle(ele)}>
        Rem
      </button>
    </li>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="home-head">
        <h1>
          Lets <span>Fly</span>
        </h1>
        <p>"It's not about your shoes. It's what you do in them."</p>
      </div>
      <img src="shoehome-4.png" alt="shoehome" className="home-shoe" />
    </div>
  );
}

function Products({ Items, onAddCart, isOpen }) {
  return (
    <div className=" products">
      <ul className={isOpen ? "prd-list-small" : "product-list"}>
        {Items.map((item) => (
          <Product
            item={item}
            key={item.id}
            onAddCart={onAddCart}
            isOpen={isOpen}
          />
        ))}
      </ul>
    </div>
  );
}

function Product({ item, onAddCart, isOpen }) {
  return (
    <li className="list-item">
      <button className="btn-add" onClick={() => onAddCart(item)}>
        Add to cart
      </button>
      <div className={isOpen ? "details-small" : "details"}>
        <img src={item.img} alt={item.name} />
        <h3>{item.name}</h3>
        <p style={{ maxWidth: "200px", marginLeft: "30px" }}>{item.details}</p>
        <h2 style={{ marginTop: "20px" }}>${item.price}.00</h2>
      </div>
    </li>
  );
}
