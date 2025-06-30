import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    title: "Pringles",
    description: "Crispy and delicious Pringles chips",
    price: 1500,
    category: "snacks",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjhJEZgTu-YKFoVH2W8CpWCR1XZAU3lcDNpA&s"
  },
  {
  id: 8,
  title: "Ocean Safari Cheese Cheetos",
  description: "Cheesy, crunchy, and shaped like sea creatures — this fun snack brings an ocean of flavor in every bite!",
  price: 50,
  category: "snacks",
  image: "https://img.drz.lazcdn.com/static/pk/p/897da5349cdebedadf3344f57396a8d0.jpg_400x400q75.avif"
  },
  {
  id: 7,
  title: "Smile Donut",
  description: "A soft, chocolate-glazed donut topped with rainbow sprinkles and filled with gooey marshmallow love — sweet joy in every bite!",
  price: 70,
  category: "desserts",
  image: "https://img.drz.lazcdn.com/static/pk/p/704dd26a27ad13a4356dc6765df7a52f.jpg_400x400q75.avif"
 }, 
  {
    id: 2,
    title: "Flaming Hot Cheetos",
    description: "Spicy and crunchy flaming hot Cheetos",
    price: 50,
    category: "snacks",
    image: "https://img.drz.lazcdn.com/static/pk/p/951dabcd67f58f547083857840a2abd7.jpg_400x400q75.avif"
  },
  {
  id: 9,
  title: "Lays Barbeque Wavy",
  description: "Crunchy, smoky, and irresistibly good — these BBQ wavy chips pack bold flavor into every crisp bite!",
  price: 60,
  category: "snacks",
  image: "https://img.drz.lazcdn.com/g/kf/Sd1f15e290d8743f7a96164b71cdd6fa2w.jpg_400x400q75.avif"
  },
  {
    id: 3,
    title: "Flaming Hot Wavy",
    description: "Wavy chips with flaming hot spice",
    price: 100,
    category: "snacks",
    image: "https://img.drz.lazcdn.com/static/pk/p/3edd83c6f7c39417973626c90fbd1ffd.jpg_400x400q75.avif"
  },
  {
    id: 4,
    title: "Korneez Plain Popcorn",
    description: "Classic plain popcorn, perfect for any snack time",
    price: 270,
    category: "snacks",
    image: "https://img.drz.lazcdn.com/static/pk/p/b3d8f730ffbf6e43dc8ea077bcaef941.jpg_400x400q75.avif"
  },
  {
    id: 5,
    title: "Korneez Cheese Popcorn",
    description: "Cheesy and delicious popcorn to satisfy your cravings",
    price: 200,
    category: "snacks",
    image: "https://img.drz.lazcdn.com/g/kf/S094f3cc00427491cba7ef68ddacbf1bec.jpg_400x400q75.avif"
  },
  {
    id: 6,
    title: "Zombie Snacks",
    description: "Sour, chewy, and scarily addictive – the ultimate undead treat!",
    price: 30,
    category: "snacks",
    image: "https://jojoshop.pk/cdn/shop/files/Zombiers.20comboflavorblueberry_strawberrytray.jpg?v=1694670465"
  }
];

function ProductCard({ product, onAddToCart }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-cover rounded-lg mb-3 mx-auto"
      />
      <h3 className="text-lg font-semibold text-dark mb-1">{product.title}</h3>
      <p className="text-sm font-medium text-primary">{product.price} PKR</p>
      {!expanded && (
        <p className="text-sm text-gray-500 mt-1">Tap to view details</p>
      )}

      {expanded && (
        <div className="mt-2 text-sm text-gray-700">
          <p>{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
              {product.category}
            </span>
            <button
              className="bg-primary text-white px-3 py-1 rounded-xl shadow hover:bg-indigo-600"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Add to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [customerDetails, setCustomerDetails] = useState({ name: "", kit: "", wing: "" });
  const [orders, setOrders] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [askPassword, setAskPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);
  }, []);

  useEffect(() => {
    if (orders !== null) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);
  useEffect(() => {
    if (adminMode) {
      const interval = setInterval(() => {
        const updatedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(updatedOrders);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [adminMode]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  const handlePlaceOrder = () => {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const suffix = (d => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    })(day);
    const timestamp = `${day}${suffix} of ${dateObj.toLocaleString('default', { month: 'long' })}, ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder = {
      ...customerDetails,
      items: cart,
      total: calculateTotal(),
      timestamp
    };

    setOrders(prev => [...prev, newOrder]);
    setCart([]);
    setCustomerDetails({ name: "", kit: "", wing: "" });
    setShowForm(false);
    setShowConfirmation(true);
  };

  const handleDelivered = (index) => {
    setOrders(prev => prev.filter((_, i) => i !== index));
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const categories = ["all", ...new Set(products.map(product => product.category))];
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (!showMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-amber-100 via-blue-100 to-purple-200 flex flex-col items-center justify-center text-center text-dark p-6">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 animate-pulse">
          Pulse
        </h1>
        <h2 className="text-2xl font-semibold mb-6">This is where you find the unfindable 🌸</h2>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-600 text-lg"
            onClick={() => setShowMenu(true)}
          >
            Explore to dive into taste buds paradise
          </button>
          <button
            className="underline text-sm text-gray-600 hover:text-gray-800"
            onClick={() => setAskPassword(true)}
          >
            Admin Login
          </button>
        </div>

        {askPassword && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-2">Enter Admin Password</h2>
            <input
              type="password"
              className="border px-4 py-2 rounded w-full mb-3"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)} 
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded w-full"
              onClick={() => {
                if (passwordInput === "admin123") {
                  setAdminMode(true);
                  setShowMenu(true);
                  setAskPassword(false);
                } else {
                  alert("Incorrect password");
                }
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    );
  }
  if (adminMode && orders !== null) {
    return (
      <div className="min-h-screen bg-gray-50 text-dark p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel 🛠️</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-1">{order.name} ({order.kit}) - {order.wing}</h3>
                <p className="text-sm text-gray-500 mb-2">{order.timestamp}</p>
                <ul className="text-sm list-disc list-inside">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.title} x{item.quantity}</li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold">Total: {order.total} PKR</p>
                <button
                  className="mt-2 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  onClick={() => handleDelivered(index)}
                >
                  Delivered ✅
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (orders === null) return null;

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-green-50 text-dark flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Thank you for your order! 🥳</h2>
        <p className="mb-6 text-lg">Your delicious items are on their way!</p>
        <button
          className="bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-600"
          onClick={() => setShowConfirmation(false)}
        >
          Continue Exploring
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-pink-100 via-purple-100 to-blue-100 text-dark p-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      {/* 💖 Floating Cart Bubble */}
      {cart.length > 0 && !showForm && (
        <div className="fixed top-6 right-6 z-50">
          <button
            className="relative bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300"
            onClick={() => setShowForm(true)}
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {totalCartItems}
            </span>
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg overflow-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">Your Order</h3>
            <ul className="mb-4 space-y-2 max-h-48 overflow-y-auto">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    {item.title} x{item.quantity}
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-0.5 bg-red-400 rounded text-white hover:bg-red-600"
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="font-semibold mb-4">Total: {calculateTotal()} PKR</p>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!customerDetails.name || !customerDetails.kit || !customerDetails.wing) {
                  alert("Please fill all details");
                  return;
                }
                handlePlaceOrder();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={customerDetails.name}
                onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Kit Number"
                value={customerDetails.kit}
                onChange={e => setCustomerDetails({ ...customerDetails, kit: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Wing"
                value={customerDetails.wing}
                onChange={e => setCustomerDetails({ ...customerDetails, wing: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-indigo-600"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔙 Back to Home */}
      <div className="fixed top-6 left-6">
        <button
          className="text-sm text-primary underline hover:text-indigo-700"
          onClick={() => setShowMenu(false)}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
