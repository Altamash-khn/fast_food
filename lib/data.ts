const dummyData = {
  categories: [
    { name: "Burgers", description: "Juicy grilled burgers" },
    { name: "Pizzas", description: "Oven-baked cheesy pizzas" },
    { name: "Burritos", description: "Rolled Mexican delights" },
    { name: "Sandwiches", description: "Stacked and stuffed sandwiches" },
    { name: "Wraps", description: "Rolled up wraps packed with flavor" },
    { name: "Bowls", description: "Balanced rice and protein bowls" },
  ],

  customizations: [
    { name: "Extra Cheese", price: 25, type: "topping" },
    { name: "Jalapeños", price: 20, type: "topping" },
    { name: "Onions", price: 10, type: "topping" },
    { name: "Olives", price: 15, type: "topping" },
    { name: "Mushrooms", price: 18, type: "topping" },
    { name: "Tomatoes", price: 10, type: "topping" },
    { name: "Bacon", price: 30, type: "topping" },
    { name: "Avocado", price: 35, type: "topping" },

    { name: "Coke", price: 30, type: "side" },
    { name: "Fries", price: 35, type: "side" },
    { name: "Garlic Bread", price: 40, type: "side" },
    { name: "Chicken Nuggets", price: 50, type: "side" },
    { name: "Iced Tea", price: 28, type: "side" },
    { name: "Salad", price: 33, type: "side" },
    { name: "Potato Wedges", price: 38, type: "side" },
    { name: "Mozzarella Sticks", price: 45, type: "side" },
    { name: "Sweet Corn", price: 25, type: "side" },
    { name: "Choco Lava Cake", price: 42, type: "side" },
    { name: "Ice Cream Scoop", price: 35, type: "side" },
  ],

  menu: [
    {
      name: "Classic Cheeseburger",
      subtitle: "Cheeseburger",
      bun_type: "Whole Wheat",
      description:
        "A classic cheeseburger packed with a juicy beef patty, melted cheese, crisp lettuce, and fresh tomatoes. Every bite delivers rich flavor with perfectly balanced textures.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/044/844/600/large_2x/homemade-fresh-tasty-burger-with-meat-and-cheese-classic-cheese-burger-and-vegetable-ai-generated-free-png.png",
      price: 25.99,
      rating: 4.5,
      calories: 550,
      protein: 25,
      category_name: "Burgers",
      customizations: ["Extra Cheese", "Coke", "Fries", "Onions", "Bacon"],
    },

    {
      name: "Pepperoni Pizza",
      subtitle: "Pizza",
      bun_type: "Thin Crust",
      description:
        "A delicious pizza loaded with spicy pepperoni slices, rich tomato sauce, and melted cheese baked on a crispy crust.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/023/742/417/large_2x/pepperoni-pizza-isolated-illustration-ai-generative-free-png.png",
      price: 30.99,
      rating: 4.7,
      calories: 700,
      protein: 30,
      category_name: "Pizzas",
      customizations: [
        "Extra Cheese",
        "Jalapeños",
        "Garlic Bread",
        "Coke",
        "Olives",
      ],
    },

    {
      name: "Bean Burrito",
      subtitle: "Burrito",
      bun_type: "Soft Tortilla",
      description:
        "A hearty burrito stuffed with seasoned beans, rice, and fresh salsa, wrapped in a soft tortilla for a satisfying meal.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/055/133/581/large_2x/deliciously-grilled-burritos-filled-with-beans-corn-and-fresh-vegetables-served-with-lime-wedge-and-cilantro-isolated-on-transparent-background-free-png.png",
      price: 20.99,
      rating: 4.2,
      calories: 480,
      protein: 18,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Iced Tea", "Fries", "Salad"],
    },

    {
      name: "BBQ Bacon Burger",
      subtitle: "Burger",
      bun_type: "Sesame Bun",
      description:
        "A smoky BBQ burger topped with crispy bacon, cheddar cheese, and fresh veggies, delivering bold and savory flavors.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/060/236/245/large_2x/a-large-hamburger-with-cheese-onions-and-lettuce-free-png.png",
      price: 27.5,
      rating: 4.8,
      calories: 650,
      protein: 29,
      category_name: "Burgers",
      customizations: ["Onions", "Fries", "Coke", "Bacon", "Avocado"],
    },

    {
      name: "Chicken Caesar Wrap",
      subtitle: "Wrap",
      bun_type: "Whole Wheat Wrap",
      description:
        "A fresh wrap filled with grilled chicken, crunchy lettuce, and creamy Caesar dressing, wrapped in a soft tortilla.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/048/930/603/large_2x/caesar-wrap-grilled-chicken-isolated-on-transparent-background-free-png.png",
      price: 21.5,
      rating: 4.4,
      calories: 490,
      protein: 28,
      category_name: "Wraps",
      customizations: ["Extra Cheese", "Coke", "Potato Wedges", "Tomatoes"],
    },

    {
      name: "Grilled Veggie Sandwich",
      subtitle: "Veg Sandwich",
      bun_type: "Multigrain Bread",
      description:
        "A wholesome sandwich packed with roasted veggies, pesto sauce, and melted cheese between perfectly grilled bread.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/047/832/012/large_2x/grilled-sesame-seed-bread-veggie-sandwich-with-tomato-and-onion-free-png.png",
      price: 19.99,
      rating: 4.1,
      calories: 420,
      protein: 19,
      category_name: "Sandwiches",
      customizations: ["Mushrooms", "Olives", "Mozzarella Sticks", "Iced Tea"],
    },

    {
      name: "Double Patty Burger",
      subtitle: "Cheeseburger",
      bun_type: "Sesame Bun",
      description:
        "A loaded burger with two juicy beef patties layered with cheese and fresh toppings, offering a rich and filling experience.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/060/359/627/large_2x/double-cheeseburger-with-lettuce-tomatoes-cheese-and-sesame-bun-free-png.png",
      price: 32.99,
      rating: 4.9,
      calories: 720,
      protein: 35,
      category_name: "Burgers",
      customizations: [
        "Extra Cheese",
        "Onions",
        "Fries",
        "Coke",
        "Chicken Nuggets",
      ],
    },

    {
      name: "Paneer Tikka Wrap",
      subtitle: "Paneer Wrap",
      bun_type: "Whole Wheat Wrap",
      description:
        "A spicy paneer wrap filled with grilled paneer chunks, fresh veggies, and mint chutney for a flavorful Indian twist.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/057/913/530/large_2x/delicious-wraps-a-tantalizing-array-of-wraps-filled-with-vibrant-vegetables-succulent-fillings-and-fresh-ingredients-artfully-arranged-for-a-mouthwatering-culinary-experience-free-png.png",
      price: 23.99,
      rating: 4.6,
      calories: 470,
      protein: 20,
      category_name: "Wraps",
      customizations: ["Jalapeños", "Tomatoes", "Salad", "Fries", "Iced Tea"],
    },

    {
      name: "Mexican Burrito Bowl",
      subtitle: "Bowl",
      bun_type: "No Bun",
      description:
        "A nutritious bowl loaded with rice, beans, corn, guacamole, and salsa, offering a perfect mix of flavors.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/057/466/374/large_2x/healthy-quinoa-bowl-with-avocado-tomato-and-black-beans-ingredients-free-png.png",
      price: 26.49,
      rating: 4.7,
      calories: 610,
      protein: 24,
      category_name: "Bowls",
      customizations: ["Avocado", "Sweet Corn", "Salad", "Iced Tea"],
    },

    {
      name: "Spicy Chicken Sandwich",
      subtitle: "Chicken Sandwich",
      bun_type: "Brown Bread",
      description:
        "A crispy chicken sandwich with spicy sauce, crunchy pickles, and fresh veggies, delivering a bold kick of flavor.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/051/814/008/large_2x/a-grilled-chicken-sandwich-with-lettuce-and-tomatoes-free-png.png",
      price: 24.99,
      rating: 4.3,
      calories: 540,
      protein: 26,
      category_name: "Sandwiches",
      customizations: [
        "Jalapeños",
        "Onions",
        "Fries",
        "Coke",
        "Choco Lava Cake",
      ],
    },

    {
      name: "Classic Margherita Pizza",
      subtitle: "Pizza",
      bun_type: "Thin Crust",
      description:
        "A classic Italian pizza topped with fresh mozzarella, tomato sauce, and basil, delivering simple yet rich flavors.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/058/700/845/large_2x/free-isolated-on-transparent-background-delicious-pizza-topped-with-fresh-tomatoes-basil-and-melted-cheese-perfect-for-food-free-png.png",
      price: 26.99,
      rating: 4.1,
      calories: 590,
      protein: 21,
      category_name: "Pizzas",
      customizations: ["Extra Cheese", "Olives", "Coke", "Garlic Bread"],
    },

    {
      name: "Protein Power Bowl",
      subtitle: "Healthy Bowl",
      bun_type: "No Bun",
      description:
        "A healthy bowl packed with grilled chicken, quinoa, and fresh veggies, perfect for a protein-rich meal.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/056/106/379/large_2x/top-view-salad-with-chicken-avocado-tomatoes-and-lettuce-free-png.png",
      price: 29.99,
      rating: 4.8,
      calories: 580,
      protein: 38,
      category_name: "Bowls",
      customizations: ["Avocado", "Salad", "Sweet Corn", "Iced Tea"],
    },

    {
      name: "Paneer Burrito",
      subtitle: "Burrito",
      bun_type: "Soft Tortilla",
      description:
        "A delicious burrito filled with paneer cubes, spicy masala, rice, and beans wrapped in a soft tortilla.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/056/565/254/large_2x/burrito-with-cauliflower-and-vegetables-free-png.png",
      price: 24.99,
      rating: 4.2,
      calories: 510,
      protein: 22,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Fries", "Garlic Bread", "Coke"],
    },

    {
      name: "Chicken Club Sandwich",
      subtitle: "Club Sandwich",
      bun_type: "Brown Bread",
      description:
        "A classic club sandwich stacked with grilled chicken, fresh lettuce, cheese, and tomatoes for a satisfying bite.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/060/364/135/large_2x/a-flavorful-club-sandwich-with-turkey-bacon-and-fresh-vegetables-sliced-and-isolated-on-a-transparent-background-free-png.png",
      price: 27.49,
      rating: 4.5,
      calories: 610,
      protein: 31,
      category_name: "Sandwiches",
      customizations: ["Bacon", "Tomatoes", "Mozzarella Sticks", "Iced Tea"],
    },

    {
      name: "Veg Supreme Pizza",
      subtitle: "Veg Pizza",
      bun_type: "Cheese Burst",
      description:
        "A veggie-loaded pizza topped with fresh vegetables, herbs, and melted cheese for a rich and satisfying taste.",
      image_url: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
      price: 28.99,
      rating: 4.6,
      calories: 640,
      protein: 22,
      category_name: "Pizzas",
      customizations: ["Extra Cheese", "Olives", "Jalapeños", "Coke"],
    },

    {
      name: "Chicken Burrito",
      subtitle: "Burrito",
      bun_type: "Soft Tortilla",
      description:
        "A filling burrito packed with grilled chicken, rice, beans, and salsa wrapped in a soft tortilla.",
      image_url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      price: 26.99,
      rating: 4.5,
      calories: 600,
      protein: 32,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Fries", "Coke", "Salad"],
    },

    {
      name: "Loaded Fries Bowl",
      subtitle: "Fries Bowl",
      bun_type: "No Bun",
      description:
        "Crispy fries topped with cheese, sauces, and veggies for a loaded and indulgent snack experience.",
      image_url: "https://images.unsplash.com/photo-1576107232684-1279f390859f",
      price: 18.99,
      rating: 4.3,
      calories: 520,
      protein: 12,
      category_name: "Bowls",
      customizations: ["Extra Cheese", "Onions", "Tomatoes"],
    },

    {
      name: "Paneer Sandwich",
      subtitle: "Paneer Sandwich",
      bun_type: "Multigrain Bread",
      description:
        "A grilled sandwich filled with paneer, fresh veggies, and chutney, offering a delicious vegetarian option.",
      image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      price: 21.99,
      rating: 4.4,
      calories: 480,
      protein: 20,
      category_name: "Sandwiches",
      customizations: ["Tomatoes", "Onions", "Iced Tea"],
    },

    {
      name: "Chicken Wrap Deluxe",
      subtitle: "Wrap",
      bun_type: "Soft Wrap",
      description:
        "A loaded chicken wrap with juicy chicken pieces, fresh veggies, and creamy sauces wrapped perfectly.",
      image_url: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
      price: 24.99,
      rating: 4.7,
      calories: 530,
      protein: 30,
      category_name: "Wraps",
      customizations: ["Extra Cheese", "Fries", "Coke"],
    },

    {
      name: "Spicy Veggie Burger",
      subtitle: "Veg Burger",
      bun_type: "Whole Wheat",
      description:
        "A crispy veggie burger with spicy flavors, fresh toppings, and a soft bun, perfect for a satisfying bite.",
      image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 22.49,
      rating: 4.2,
      calories: 510,
      protein: 18,
      category_name: "Burgers",
      customizations: ["Jalapeños", "Onions", "Fries", "Coke"],
    },

    {
      name: "Smoky BBQ Chicken Burger",
      subtitle: "Chicken Burger",
      bun_type: "Sesame Bun",
      description:
        "A smoky and juicy grilled chicken burger layered with BBQ sauce, fresh lettuce, and melted cheese. Perfectly balanced flavors with a soft toasted bun.",
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      price: 23.99,
      rating: 4.6,
      calories: 520,
      protein: 28,
      category_name: "Burgers",
      customizations: ["Bacon", "Extra Cheese", "Fries", "Coke"],
    },

    {
      name: "Loaded Veggie Delight Pizza",
      subtitle: "Veg Pizza",
      bun_type: "Thin Crust",
      description:
        "Loaded with fresh veggies, olives, jalapeños, and a rich tomato sauce, this pizza is a paradise for veggie lovers.",
      image_url: "https://images.unsplash.com/photo-1601924928376-8c1b0d0e3c0b",
      price: 27.49,
      rating: 4.5,
      calories: 610,
      protein: 20,
      category_name: "Pizzas",
      customizations: ["Extra Cheese", "Olives", "Jalapeños", "Garlic Bread"],
    },

    {
      name: "Grilled Chicken Burrito",
      subtitle: "Chicken Burrito",
      bun_type: "Soft Wrap",
      description:
        "A hearty burrito filled with grilled chicken, seasoned rice, beans, and tangy salsa wrapped in a soft tortilla.",
      image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      price: 24.99,
      rating: 4.4,
      calories: 580,
      protein: 30,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Fries", "Coke"],
    },

    {
      name: "Ultimate Club Sandwich",
      subtitle: "Chicken Sandwich",
      bun_type: "Multigrain Bread",
      description:
        "Stacked layers of grilled chicken, crispy bacon, lettuce, tomato, and mayo between toasted bread slices.",
      image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
      price: 26.49,
      rating: 4.6,
      calories: 600,
      protein: 32,
      category_name: "Sandwiches",
      customizations: ["Bacon", "Tomatoes", "Iced Tea"],
    },

    {
      name: "Paneer Tikka Wrap Deluxe",
      subtitle: "Paneer Wrap",
      bun_type: "Whole Wheat Wrap",
      description:
        "Spicy paneer tikka chunks wrapped with crunchy veggies and mint chutney in a soft whole wheat wrap.",
      image_url: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
      price: 22.99,
      rating: 4.5,
      calories: 480,
      protein: 22,
      category_name: "Wraps",
      customizations: ["Extra Cheese", "Fries", "Coke"],
    },

    {
      name: "Protein Chicken Bowl",
      subtitle: "Healthy Bowl",
      bun_type: "No Bun",
      description:
        "A high-protein bowl packed with grilled chicken, quinoa, fresh veggies, and a light dressing.",
      image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      price: 29.99,
      rating: 4.8,
      calories: 550,
      protein: 38,
      category_name: "Bowls",
      customizations: ["Avocado", "Salad", "Iced Tea"],
    },

    {
      name: "Cheese Burst Margherita",
      subtitle: "Pizza",
      bun_type: "Cheese Burst Crust",
      description:
        "Classic margherita pizza loaded with gooey cheese and fresh basil, with a rich cheese burst crust.",
      image_url: "https://images.unsplash.com/photo-1601924928376-8c1b0d0e3c0b",
      price: 28.99,
      rating: 4.7,
      calories: 630,
      protein: 21,
      category_name: "Pizzas",
      customizations: ["Extra Cheese", "Olives", "Coke"],
    },

    {
      name: "Spicy Chicken Wrap",
      subtitle: "Wrap",
      bun_type: "Soft Wrap",
      description:
        "Crispy chicken tossed in spicy sauce wrapped with lettuce and mayo for a fiery bite.",
      image_url: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
      price: 23.49,
      rating: 4.3,
      calories: 510,
      protein: 27,
      category_name: "Wraps",
      customizations: ["Jalapeños", "Fries", "Coke"],
    },

    {
      name: "Classic Veggie Sandwich",
      subtitle: "Veg Sandwich",
      bun_type: "Brown Bread",
      description:
        "Fresh veggies layered with cheese and sauces in toasted brown bread.",
      image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
      price: 18.99,
      rating: 4.2,
      calories: 420,
      protein: 18,
      category_name: "Sandwiches",
      customizations: ["Tomatoes", "Onions", "Iced Tea"],
    },

    {
      name: "Loaded Chicken Fries Bowl",
      subtitle: "Fries Bowl",
      bun_type: "No Bun",
      description:
        "Crispy fries topped with juicy chicken, cheese sauce, and spicy mayo.",
      image_url: "https://images.unsplash.com/photo-1576107232684-1279f390859f",
      price: 21.99,
      rating: 4.4,
      calories: 560,
      protein: 24,
      category_name: "Bowls",
      customizations: ["Extra Cheese", "Coke"],
    },

    {
      name: "Mexican Chicken Burrito",
      subtitle: "Burrito",
      bun_type: "Soft Wrap",
      description:
        "Mexican-style burrito with seasoned chicken, rice, beans, and salsa.",
      image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      price: 25.99,
      rating: 4.6,
      calories: 600,
      protein: 31,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Fries"],
    },

    {
      name: "Double Cheese Burger",
      subtitle: "Cheeseburger",
      bun_type: "Sesame Bun",
      description:
        "Two juicy patties layered with melted cheese and fresh veggies for an indulgent bite.",
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      price: 29.99,
      rating: 4.9,
      calories: 720,
      protein: 36,
      category_name: "Burgers",
      customizations: ["Extra Cheese", "Bacon", "Fries"],
    },

    {
      name: "Iced Coffee",
      subtitle: "Drink",
      bun_type: "Cup",
      description:
        "Refreshing iced coffee with a creamy texture and perfect sweetness.",
      image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      price: 12.99,
      rating: 4.3,
      calories: 250,
      protein: 5,
      category_name: "Bowls",
      customizations: ["Ice Cream Scoop"],
    },

    {
      name: "Chocolate Lava Cake",
      subtitle: "Dessert",
      bun_type: "Cup",
      description:
        "Warm chocolate cake with a gooey molten center served fresh.",
      image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      price: 15.99,
      rating: 4.8,
      calories: 350,
      protein: 6,
      category_name: "Bowls",
      customizations: ["Ice Cream Scoop"],
    },

    {
      name: "Veggie Power Bowl",
      subtitle: "Healthy Bowl",
      bun_type: "No Bun",
      description:
        "A balanced bowl of roasted veggies, grains, and protein-rich toppings.",
      image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      price: 22.99,
      rating: 4.5,
      calories: 480,
      protein: 20,
      category_name: "Bowls",
      customizations: ["Avocado", "Salad"],
    },
  ],
};

export default dummyData;
