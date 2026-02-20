import { BiCartDownload } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuRef = useRef(null);
  const accountRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    navigate(
      value.trim()
        ? `/shop?search=${encodeURIComponent(value)}`
        : "/shop"
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="w-full px-6 py-1 bg-white">

        {/* MARQUEE */}
        <div className="w-full bg-linear-to-r from-pink-700 to-purple-500 text-white py-4 px-6 rounded-2xl">
          <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <marquee>
              Mega Festival live now! Grab your products with an exclusive discount offers upto 50% and more which is available for 6 days. Hurry! Buy now!
            </marquee>
          </div>
        </div>

        {/* GREEN CONTAINER */}
       <div className="relative max-w-8xl mx-auto bg-[#245b2a] rounded-3xl px-8 py-6 shadow flex flex-col">

          {/* MOBILE TOP ROW */}
          <div className="flex md:hidden items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="px-4 py-2 font-bold text-xl rounded-lg mr-3 text-transparent bg-gradient-to-r from-yellow-500 to-gray-200"
              style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
            >
              🪶Classy.Nest.
            </Link>

            {/* SEARCH */}
            <div className="flex-1 mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-1 rounded-full text-sm bg-white"
              />
            </div>

            {/* MENU ICON */}
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-white"
            >
              ☰
            </button>
          </div>

          {/* DESKTOP FIRST ROW */}
          <div className="hidden md:flex items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="px-4 py-2 font-bold text-4xl rounded-lg mr-3 text-transparent bg-gradient-to-r from-yellow-500 to-gray-200"
              style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
            >
              🪶Classy.Nest.
            </Link>

            {/* SEARCH */}
            <div className="relative w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none"
              />
            </div>

            {/* USER + CART */}
            <div className="flex items-center space-x-6">

              {!user ? (
                <Link to="/login">
                  <FiUser className="text-2xl text-white hover:scale-110 transition" />
                </Link>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="text-white px-2 rounded-2xl text-base font-medium hover:underline"
                  >
                    Hi, {user.isAdmin ? "Admin" : user.name} ▾
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={() => {
                          setShowLogoutConfirm(true);
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Link to="/cart" className="relative">
                <FiShoppingCart className="text-2xl text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* DESKTOP SECOND ROW */}
          <div className="hidden md:flex justify-center mt-2 space-x-12 text-lg text-white">

            <Link to="/" className="hover:underline">Home</Link>

            <div
              className="relative"
              ref={menuRef}
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button className="hover:underline">Shop ▾</button>

              {menuOpen && (
                <div className="absolute top-full mt-3 w-56 bg-white rounded-xl shadow-lg py-3 z-50">
                  {[
                    "Sofa", "Recliners", "Dining", "Tables",
                    "Chairs", "Kitchen", "Outdoor", "Living", "Wardrobes",
                  ].map((item) => (
                    <Link
                      key={item}
                      to={`/shop/${item.toLowerCase()}`}
                      className="block px-5 py-2 text-gray-600 hover:bg-orange-50 hover:text-black"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            

            <button onClick={() => scrollToSection("about")} className="hover:underline">
              About
            </button>

            <button onClick={() => scrollToSection("contact")} className="hover:underline">
              Contact
            </button>

            {user && (
              <div
                className="relative"
                ref={accountRef}
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button className="hover:underline">Account ▾</button>

                {accountOpen && (
                  <div className="absolute top-full mt-3 w-44 bg-white rounded-xl shadow-lg py-3 z-50">
                    <Link to="/orders" className="block px-5 py-2 mt-4 text-gray-600 hover:bg-orange-50 hover:text-black">
                      My Orders
                    </Link>
                    <Link to="/location" className="block px-5 py-2 text-gray-600 hover:bg-orange-50 hover:text-black">
                      Saved Address
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* MOBILE MENU */}
{open && (
  <div
    className="
      md:hidden
      absolute
      left-0
      right-0
      top-full
      mt-3
      bg-gray-100
      rounded-2xl
      shadow-xl
      px-6
      py-6
      flex
      flex-col
      space-y-4
      z-50
      animate-slideDown
    "
  >

    <Link to="/" onClick={() => setOpen(false)} className="py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black">
      Home
    </Link> 

    <Link to="/shop" onClick={() => setOpen(false)} className="py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black">
      Shop
    </Link>

    <button
      onClick={() => {
        scrollToSection("about");
        setOpen(false);
      }}
      className="text-left py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black"
    >
      About
    </button>

    <button
      onClick={() => {
        scrollToSection("contact");
        setOpen(false);
      }}
      className="text-left py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black"
    >
      Contact
    </button>

    {/* ACCOUNT — MOBILE ONLY */}
    {user && (
      <>
        <Link to="/orders" onClick={() => setOpen(false)} className="text-left py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black">
          My Orders
        </Link>

        <Link to="/location" onClick={() => setOpen(false)} className="text-left py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black">
          Saved Address
        </Link>
      </>
    )}

    {!user ? (
      <Link to="/login" onClick={() => setOpen(false)} className="text-left py-2 pl-10-2">
        Login
      </Link>
    ) : (
      <button
        onClick={() => {
          setShowLogoutConfirm(true);
          setOpen(false);
        }}
        className="text-left py-2 pl-10 text-red-600 hover:bg-orange-50 rounded-2xl hover:text-red-700"
      >
        Logout
      </button>
    )}

    <Link to="/cart" onClick={() => setOpen(false)} className="pytext-left py-2 pl-10 text-gray-600 hover:bg-orange-50 rounded-2xl hover:text-black">
      Cart
    </Link>

  </div>
)}

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-[92%] max-w-md shadow-xl">
            <h3 className="text-2xl font-semibold mb-3">Confirm Logout</h3>
            <p className="text-gray-600 mb-8">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-2 rounded-full border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                  setOpen(false);
                }}
                className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
