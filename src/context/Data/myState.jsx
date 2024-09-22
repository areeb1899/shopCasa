import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, fireDb } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const myState = (props) => {
    const navigate = useNavigate();


    //dark mode
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
        document.body.style.backgroundColor = newMode === 'dark' ? 'rgb(17,24,39)' : 'white';
    };

    useEffect(() => {
        document.body.style.backgroundColor = mode === 'dark' ? 'rgb(17,24,39)' : 'white';
    }, [mode]);

    // Loading
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageURL: [],
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        })
    });

    // Add product function
    const addProduct = async () => {
        const { title, price, imageURL, category, description } = products;
        if (title == null || price == null || imageURL == null || category == null || description == null) {
            return toast.error("All fields are required");
        }
        setLoading(true);
        try {
            const productRef = collection(fireDb, "products");

            // Add the document first without the id field
            const docRef = await addDoc(productRef, {
                title,
                price,
                imageURL,
                category,
                description,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                })
            });

            // Now update the document to include the id field
            await setDoc(docRef, { id: docRef.id }, { merge: true });

            toast.success("Added product successfully");
            getProductData(); // Refresh the product list
            navigate('/dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    // Get product data
    const [product, setProduct] = useState([]);

    const getProductData = async () => {
        setLoading(true);
        try {
            const Q = query(collection(fireDb, 'products'), orderBy('time'));
            const data = onSnapshot(Q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Update product function
    const editHandle = (item) => {
        setProducts(item);
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDb, 'products', products.id), products);
            toast.success("Product updated successfully");
            getProductData();
            navigate('/dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Delete product function
    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDb, 'products', item.id));
            toast.success("Product deleted successfully");
            getProductData();
            setLoading(false);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete product");
            setLoading(false);
        }
    };

    // Get order data from Firebase
    const [order, setOrder] = useState([]);
    const getOrderData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(fireDb, 'order'));
            const orderArray = [];
            querySnapshot.forEach((doc) => {
                orderArray.push({ ...doc.data(), id: doc.id });
            });
            setOrder(orderArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Get user details from Firebase
    const [userDetails, setUserDetails] = useState([]);
    const getUserData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(fireDb, 'users'));
            const userArray = [];
            querySnapshot.forEach((doc) => {
                userArray.push({ ...doc.data(), id: doc.id });
            });
            setUserDetails(userArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Get current user from Firebase
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        getUserData();
        return () => unsubscribe();
    }, []);



    const loggedInUser = userDetails.find((user) => user.uid === currentUser?.uid);

    // console.log(loggedInUser)
    useEffect(() => {
        getProductData();
        getOrderData();
        getUserData();
    }, []);

    // Searching product
    const [searchKey, setSearchKey] = useState('');

    // Delete user function
    const deleteUser = async (email) => {
        setLoading(true);
        try {
            // Show confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to delete this user?");

            if (!isConfirmed) {
                setLoading(false);
                return;
            }

            const querySnapshot = await getDocs(collection(fireDb, 'users'));
            const userToDelete = querySnapshot.docs.find(doc => doc.data().email === email);

            if (userToDelete) {
                await deleteDoc(doc(fireDb, 'users', userToDelete.id));
                toast.success("User deleted successfully");
                getUserData();
            } else {
                toast.error("User not found");
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
            setLoading(false);
        }
    };

    // Review state and functions
    const [reviews, setReviews] = useState([]);
    // console.log(reviews)
    const addReview = async (productId, reviewData) => {
        setLoading(true);
        try {
            const reviewRef = collection(fireDb, `products/${productId}/reviews`);
            await addDoc(reviewRef, {
                ...reviewData,
                timestamp: Timestamp.now(),
            });
            toast.success("Review added successfully");
            getProductReviews(productId); // Refresh reviews after adding
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to add review");
            setLoading(false);
        }
    };


    //fetching the user reviews
    const getProductReviews = async (productId) => {
        setLoading(true);
        try {
            const reviewQuery = query(collection(fireDb, `products/${productId}/reviews`), orderBy('timestamp'));
            const data = await getDocs(reviewQuery);
            let reviewsArray = [];
            data.forEach(doc => reviewsArray.push({ ...doc.data(), id: doc.id }));
            setReviews(reviewsArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };



    // Delete account function
    const deleteAccount = async () => {
        if (!currentUser) {
            toast.error("No user is logged in");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!isConfirmed) return;

        setLoading(true);
        try {
            // Delete the user from Firebase Authentication
            await signOut(auth);
            await currentUser.delete();

            // Delete the user document from Firestore
            const userDocRef = doc(fireDb, "users", loggedInUser?.id);
            await deleteDoc(userDocRef);

            toast.success("Account deleted successfully");
            setLoading(false);
            navigate('/'); // Navigate the user to the homepage after deletion
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete account. Please log in again to perform this action.");
            setLoading(false);
        }
    };



    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading, products,
            setProducts, addProduct, product, editHandle, updateProduct, deleteProduct,
            getOrderData, order, setOrder, userDetails, setUserDetails, getUserData, searchKey,
            setSearchKey, loggedInUser, deleteUser, addReview, getProductReviews, reviews, deleteAccount
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

export default myState;
