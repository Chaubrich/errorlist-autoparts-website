import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../backend/firebase';
import { collection, getDocs, doc, query, where, addDoc } from "firebase/firestore";
import '../styles/Category.css'

export const Category = () => {
    const { categoryName } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryItems = async () => {
            try {
                setLoading(true);

                const mainCollectionRef = collection(firestore, "Inventory");
                const documentRef = doc(mainCollectionRef, "QGUACBx2urBhlg7BFeFI");
                const subCollectionRef = collection(documentRef, "Products");

                const itemsQuery = query(subCollectionRef, where("Category", "==", getCategoryId(categoryName)));
                const data = await getDocs(itemsQuery);

                const categoryItems = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(categoryItems);
            } catch (err) {
                setError("Failed to load items for this category.");
                console.error("Error fetching category items:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryItems();
    }, [categoryName]);

    const getCategoryId = (name) => {
        const categoryMapping = {
            "Engine & Exhaust": 1,
            "Electrical & Ignition": 2,
            "Cooling & Air System": 3,
            "Braking & Suspension": 4,
            "Body & Accessories": 5,
        };
        return categoryMapping[name] || null;
    };

    const addToCart = async(product) => {
        const cartRef = collection(firestore, "Cart");
        const docRef = doc(cartRef, "Checkout");
        const itemRef = collection(docRef, "Item");
        try {
            await addDoc(itemRef, {
                ...product,
                quantity: 1, // default to 1 when first added
                });
                console.log("Item added to cart:", product);
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
    };


    return (
        <div className="category-page-container">
            <h1>{categoryName}</h1>
            <div className="sort-dropdown">
                <label htmlFor="sortOrder">Sort by Price: </label>
                <div className="custom-dropdown">
                    <select id="sortOrder">
                        <option value="low-to-high">Default</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="product-list-shop">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="product-card" onClick={() => navigate(`/item/${item.id}`)}>
                                <img src={item.Image} alt={item.Name} className="product-image"/>
                                <h3>{item.Name}</h3>
                                <p>Price: ${item.Price}</p>
                                <button className = "add-to-cart-button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            addToCart(item);
                                    }}
                                    >
                                        Add To Cart
                                    </button>
                            </div>
                        ))
                    ) : (
                        <p>No products available in this category.</p>
                    )}
                </div>
            )}
        </div>
    );
};

