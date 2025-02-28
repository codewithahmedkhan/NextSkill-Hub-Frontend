new Vue({
    el: "#app",
    data: {
      allClasses: [],
      classes: [],
      cart: [],
      showClass: true,
      sortAttribute: "title",
      isAscending: true,
      order: { fullName: "", phoneNumber: null },
      query: ""
    },
    computed: {
      // Total items in cart
      cartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
      },
      // Sorted product list based on chosen attribute and order
      sortedClasses() {
        return [...this.classes].sort((a, b) => {
          let aVal = a[this.sortAttribute];
          let bVal = b[this.sortAttribute];
          if (typeof aVal === "string") aVal = aVal.toLowerCase();
          if (typeof bVal === "string") bVal = bVal.toLowerCase();
          return this.isAscending ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });
      },
      // Total price calculation for cart
      totalPrice() {
        return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      // Validate full name (only letters and spaces, at least 2 characters)
      isValidName() {
        return /^[a-zA-Z\s]+$/.test(this.order.fullName) && this.order.fullName.trim().length > 1;
      },
      // Validate phone number (at least 9 digits)
      isValidPhoneNumber() {
        return /^\d{9,}$/.test(this.order.phoneNumber);
      },
      // Form valid only if both fields are valid
      isFormValid() {
        return this.isValidName && this.isValidPhoneNumber;
      }
    },
    methods: {
      // Toggle sorting order
      toggleSortOrder() {
        this.isAscending = !this.isAscending;
      },
      // Add product to cart and update available seats
      addToCart(product) {
        const cartItem = this.cart.find(item => item.product._id === product._id);
        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.cart.push({ product, quantity: 1 });
        }
        if (product.availableSeats > 0) {
          product.availableSeats--;
        }
      },
      // Remove product from cart and restore seats
      removeFromCart(product) {
        const index = this.cart.findIndex(item => item.product._id === product._id);
        if (index !== -1) {
          this.cart[index].product.availableSeats += this.cart[index].quantity;
          this.cart.splice(index, 1);
        }
        if (this.cart.length === 0) {
          this.showClass = true;
        }
      },
      // Toggle between class listing and checkout view
      showCheckout() {
        this.showClass = !this.showClass;
      },
      // Placeholder for order submission
      submitForm() {
        alert("Order placed successfully!");
        this.cart = [];
        this.showClass = true;
        this.order = { fullName: "", phoneNumber: null };
      },
      // Filter products by search query
      filterProducts() {
        if (!this.query.trim()) {
          this.classes = this.allClasses;
        } else {
          const lowerQuery = this.query.trim().toLowerCase();
          this.classes = this.allClasses.filter(product => {
            return (
              product.title.toLowerCase().includes(lowerQuery) ||
              product.description.toLowerCase().includes(lowerQuery) ||
              product.location.toLowerCase().includes(lowerQuery)
            );
          });
        }
      },
      // Return image path (modify if needed)
      imageLink(path) {
        return path;
      },
      // Load unique product details manually with updated addresses
      loadProducts() {
        this.allClasses = [
          // Product 1: Table Tennis Training (Art replaced by Table Tennis)
          {
            _id: "1",
            image: "assets/9.jpeg", // Image source: https://source.unsplash.com/300x200/?tabletennis
            title: "Table Tennis Training",
            description: "Improve your reflexes and strategy with our comprehensive table tennis training sessions.",
            location: "Dubai - Al Wasl Sports Arena",
            price: 1000,
            availableSeats: 8,
            rating: 4
          },
          // Product 2: Mastering Chess Strategies
          {
            _id: "2",
            image: "assets/7.jpeg", // Image source: https://source.unsplash.com/300x200/?chess
            title: "Mastering Chess Strategies",
            description: "Enhance your strategic thinking with in-depth chess training sessions led by experts.",
            location: "Abu Dhabi - Emirates Chess Academy, Al Bateen",
            price: 800,
            availableSeats: 5,
            rating: 4
          },
          // Product 3: Innovative Coding Lab
          {
            _id: "3",
            image: "assets/5.jpeg", // Image source: https://source.unsplash.com/300x200/?coding
            title: "Innovative Coding Lab",
            description: "Learn modern programming techniques and develop creative projects in a collaborative environment.",
            location: "Dubai - Dubai Silicon Oasis Center",
            price: 1500,
            availableSeats: 4,
            rating: 5
          },
          // Product 4: Culinary Arts Experience
          {
            _id: "4",
            image: "assets/1.jpeg", // Image source: https://source.unsplash.com/300x200/?cooking
            title: "Culinary Arts Experience",
            description: "Experience hands-on cooking classes exploring global cuisines and culinary techniques.",
            location: "Sharjah - Sharjah Culinary Arts Center",
            price: 1000,
            availableSeats: 7,
            rating: 4
          },
          // Product 5: Global Debate Forum
          {
            _id: "5",
            image: "assets/4.jpeg", // Image source: https://source.unsplash.com/300x200/?debate
            title: "Global Debate Forum",
            description: "Engage in dynamic discussions on international issues and refine your public speaking skills.",
            location: "Ajman - Ajman Global Debate Hall",
            price: 900,
            availableSeats: 5,
            rating: 4
          },
          // Product 6: Melodic Harmony Music Session
          {
            _id: "6",
            image: "assets/8.jpeg", // Image source: https://source.unsplash.com/300x200/?music
            title: "Melodic Harmony Music Session",
            description: "Explore various musical instruments and vocal techniques in an inspiring creative setting.",
            location: "Fujairah - Al Corniche Music Hall",
            price: 1100,
            availableSeats: 6,
            rating: 5
          },
          // Product 7: Visual Storytelling Photography Workshop
          {
            _id: "7",
            image: "assets/11.jpeg", // Image source: https://source.unsplash.com/300x200/?photography
            title: "Visual Storytelling Photography Workshop",
            description: "Capture compelling stories through photography with guidance from industry professionals.",
            location: "Ras Al Khaimah - RAK Visual Arts Studio",
            price: 1300,
            availableSeats: 5,
            rating: 4
          },
          // Product 8: VerseCraft: Poetry & Expression
          {
            _id: "8",
            image: "assets/10.jpeg", // Image source: https://source.unsplash.com/300x200/?poetry
            title: "VerseCraft: Poetry & Expression",
            description: "Delve into the art of poetry and creative writing in a stimulating, expressive environment.",
            location: "Umm Al Quwain - Umm Al Quwain Literary Center",
            price: 800,
            availableSeats: 8,
            rating: 4
          },
          // Product 9: Eloquent Oratory: Public Speaking
          {
            _id: "9",
            image: "assets/2.jpeg", // Image source: https://source.unsplash.com/300x200/?publicspeaking
            title: "Eloquent Oratory: Public Speaking",
            description: "Boost your confidence and communication skills through practical public speaking exercises.",
            location: "Dubai - Dubai Conference Center, Downtown",
            price: 700,
            availableSeats: 5,
            rating: 5
          },
          // Product 10: Karate Class (Yoga replaced by Karate)
          {
            _id: "10",
            image: "assets/6.jpeg", // Image source: https://source.unsplash.com/300x200/?karate
            title: "Karate Class",
            description: "Learn discipline, technique, and self-defense with expert-led karate training.",
            location: "Abu Dhabi - Abu Dhabi Martial Arts Complex",
            price: 750,
            availableSeats: 10,
            rating: 5
          },
          // Product 11: Future Innovators STEM Workshop
          {
            _id: "11",
            image: "assets/3.jpeg", // Image source: https://source.unsplash.com/300x200/?stem
            title: "Future Innovators STEM Workshop",
            description: "Dive into science, technology, engineering, and math with hands-on projects that inspire innovation.",
            location: "Sharjah - Sharjah Innovation Hub",
            price: 1600,
            availableSeats: 6,
            rating: 5
          }
        ];
        this.classes = this.allClasses;
      }
    },
    created() {
      this.loadProducts();
    }
  });
  