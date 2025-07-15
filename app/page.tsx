'use client';

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (user) => {
    if (!cart.some(item => item.id === user.id)) {
      setCart([...cart, user]);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left section: Product list */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name prefix"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded-md"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold mb-1">{user.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{user.email}</p>
              <button
                onClick={() => handleAddToCart(user)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right section: Cart */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map(item => (
              <li key={item.id} className="bg-white p-3 rounded shadow text-sm">
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
