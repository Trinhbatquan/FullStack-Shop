const products = [
  {
    name: "Orient 40.8mm Men RA-AR0005Y10B",
    image: "/assets/image/clock1.jpg",
    favorite: true,
    discount: 50,
    description:
      "Olym Pianus is the name of a line of watches from the Olympia brand, born in the 50s of 20th century, in Switzerland.",
    parameters: {
      Trademark: "Oly Pianus",
      TargetCustomer: "Men's Clock",
      SKU_UPC_MPN: "RA-AR0005Y10B",
      MachineSeries: "Automatic",
      FaceSize: "42mm",
      Shape: "Circle",
      RopeMaterial: "Rubber band",
      GlassesMaterial: "Sapphire's Glasses",
      ProductedAt: "Japan's clock",
      Stype: "Luxurious",
    },
    price: 255,
    countInStock: 20,
    rating: 0,
    sold: 30,
    position: "JaPan",
    numReviews: 0,
    type: "clock",
    transport: "express",
  },
  {
    name: "Citizen 40mm Men BI1054-12E",
    image: "/assets/image/clock2.jpg",
    favorite: false,
    discount: 23,
    description:
      "Citizen watch brand was founded in 1918 by the Japanese watch research institute Shokosha. Typical Citizen collections are 'Citizen Eco-drive', 'Citizen C7', 'Citizen Sunrise Diamond',...",
    parameters: {
      Trademark: "Citizen",
      TargetCustomer: "Men's Clock",
      SKU_UPC_MPN: "BI1054-12E",
      MachineSeries: "Muscle",
      FaceSize: "40mm",
      Shape: "Circle",
      RopeMaterial: "leather cord",
      GlassesMaterial: "Sapphire's Glasses",
      ProductedAt: "Japan's clock",
      Type: "Luxurious",
    },
    price: 260,
    countInStock: 10,
    rating: 0,
    sold: 55,
    position: "America",
    numReviews: 0,
    type: "clock",
    transport: "fast",
  },

  {
    name: "Casio 43.5mm Women BA-110-7A1DR",
    image: "/assets/image/clock3.jpg",
    favorite: false,
    discount: 12,
    description:
      "Casio is a Japanese watch brand born in 1946. The brand was founded by Mr. Tadao Kashio. Casio's outstanding lines must be mentioned such as 'G - Shock', 'Baby - G', 'Casio MTP', ...",
    parameters: {
      Trademark: "Casio",
      TargetCustomer: "Women's Clock",
      SKU_UPC_MPN: "BA-110-7A1DR",
      MachineSeries: "Muscle",
      FaceSize: "30mm",
      Shape: "Circle",
      RopeMaterial: "plastic rope",
      GlassesMaterial: "Sapphire's Glasses",
      ProductedAt: "Japan's clock",
      Type: "Sports",
    },
    price: 199,
    countInStock: 22,
    rating: 0,
    sold: 10,
    position: "England",
    numReviews: 0,
    type: "clock",
    transport: "economical",
  },

  {
    name: "Ray-Ban Rx6378 Round Prescription Eyeglass Frames",
    image: "/assets/image/glasses1.jpg",
    favorite: true,
    discount: 56,
    description:
      " The Ray-Ban optical frames feature lenses that need to be replaced with prescription lenses so you can enjoy clear vision and protect your eyes from the sun while still being fashionable!",
    parameters: {
      FrameMaterial: "Plastic",
      Status: "Imported",
      LenMaterial: "Plastic",
      LenWidth: "49 milimeters",
      Bridge: "21 milimeters",
      Arm: "145 milimeters",
      PrescriptionReady:
        "The Ray-Ban optical frames feature lenses that need to be replaced with prescription lenses so you can enjoy clear vision and protect your eyes from the sun while still being fashionable!",
      CaseAndCleaningClothIncluded: "Sapphire's Glasses",
      VisitTheRay_BanBrandShop: "Japan's clock",
    },
    price: 200,
    countInStock: 32,
    rating: 0,
    sold: 10,
    position: "Agentina",
    numReviews: 0,
    type: "glasses",
    transport: "express",
  },

  {
    name: "Gaoye 2 Pack Blue Light Blocking Glasses, Retro Round Eyewear Frame Anti Eyestrain Computer Glasses for Women Men - GY1688 (Black+Pink)",
    image: "/assets/image/glasses2.jpg",
    favorite: true,
    discount: 0,
    description:
      "Blue light blockers with UV400 lenses block 100% harmful blu-ray & UVA/UVB rays, reduce discomfort from vedio, tv, phone, laptop, computer gaming or working under fluorescent lights; Protects your vision, help you anti glare, headache, eye strain, dry eye and sleep better ",
    parameters: {
      FrameMaterial: "Plastic",
      Status: "Imported",
      LenMaterial: "Plastic",
      LenWidth: "49 milimeters",
      Bridge: "21 milimeters",
      Arm: "145 milimeters",
      PrescriptionReady:
        "The Ray-Ban optical frames feature lenses that need to be replaced with prescription lenses so you can enjoy clear vision and protect your eyes from the sun while still being fashionable!",
      CaseAndCleaningClothIncluded: "Sapphire's Glasses",
      VisitTheRay_BanBrandShop: "Japan's clock",
    },
    price: 16.99,
    countInStock: 8,
    rating: 0,
    sold: 100,
    position: "Korea",
    numReviews: 0,
    type: "glasses",
    transport: "fast",
  },

  {
    name: "BURBERRY BE 2172 3001 Black Plastic Round Eyeglasses 52mm ",
    image: "/assets/image/glasses3.jpg",
    favorite: false,
    discount: 48,
    description:
      "Available at a lower price from other sellers that may not offer free Prime shipping. ",
    parameters: {
      MadeIn: "Italy",
      Status: "Exportes",
      LenMaterial: "Plastic",
      LenWidth: "49 milimeters",
      Bridge: "21 milimeters",
      Arm: "145 milimeters",
      Attention: "Buy with confidence! Authorized Retailer.",
      Retail: "Full retail package with all accessories.",
    },
    price: 16.99,
    countInStock: 8,
    rating: 0,
    sold: 100,
    position: "Italy",
    numReviews: 0,
    type: "glasses",
    transport: "economical",
  },

  {
    name: "Clearbud Gold Filled Golden Reflections Necklace ",
    image: "/assets/image/jewelry1.jpg",
    favorite: true,
    discount: 0,
    description:
      "The Golden Reflections Necklace is a versatile piece of jewelry that can be worn with casual or formal attire, making it a great addition to any jewelry collection. ",
    parameters: {
      Status:
        "The Golden Reflections Necklace is a stunning piece of jewelry, gold-filled necklace chain. ",
      Attention:
        "Clearbud serves as a reflection of inner beauty and strength, making this necklace a great gift for those who exude confidence and radiance. ",
      Retail:
        "The Golden Reflections Necklace is a versatile piece of jewelry that can be worn with casual or formal attire, making it a great addition to any jewelry collection. ",
    },
    price: 334.61,
    countInStock: 12,
    rating: 0,
    sold: 5,
    position: "Vietnamese",
    numReviews: 0,
    type: "jewelry",
    transport: "express",
  },

  {
    name: "Amazon Collection 14K Gold Round-Cut Diamond Stud Earrings (1/4-2 cttw, J-K Color, I2-I3 Clarity) ",
    image: "/assets/image/jewelry2.jpg",
    favorite: true,
    discount: 17,
    description:
      "Classical and trendy these natural diamond stud earrings are an everyday sensation, set in 14K gold with a diamond quality of K-L color and I1-I2 clarity, these studs have a total carat weight of 0.25 which is the total carat weight for both studs each earring is half of the total carat weight.",
    parameters: {
      Material:
        "14K gold with screw back posts, hypoallergenic and nickel free.",
      Details:
        "Available in White Gold or Yellow Gold and a choice of various carat weights.",
      Care: "Can be Cleaned with any non dying dish soap or ultrasonic cleaner.",
    },
    price: 303.2,
    countInStock: 5,
    rating: 0,
    sold: 10,
    position: "Australia",
    numReviews: 0,
    type: "jewelry",
    transport: "fast",
  },

  {
    name: "Amazon Collection womens 18k Yellow Gold Plated Sterling Silver Genuine Green Jade Turtle Pendant Necklace",
    image: "/assets/image/jewelry3.jpg",
    favorite: false,
    discount: 5,
    description:
      "Pendant necklace featuring a turtle design with a genuine green jade shell caged in 18k yellow gold plated sterling silver.",
    parameters: {
      Material:
        "14K gold with screw back posts, hypoallergenic and nickel free.",
      Details:
        "A thoughtful jewelry gift that will be cherished for years to come.",
      Care: "These silver pieces are built for longevity. This piece features a metal plating or flashing, or an electrocoating for a more lustrous appearance, but it can wear off with long-term or heavy use. To ensure the longevity of your plated items store your jewelry in a dark, cool, dry place such as a pouch or air tight box and avoid rubbing plated items together. Also try to avoid exposure to cleaning products and perfume which can both negatively affect your items. Your local jeweler can advise you where to send your jewelry if you would ever like them replated.",
    },
    price: 36.2,
    countInStock: 25,
    rating: 0,
    sold: 2,
    position: "China",
    numReviews: 0,
    type: "jewelry",
    transport: "economical",
  },

  {
    name: "Amazon Essentials Men's Slim-Fit 5-Pocket Stretch Twill Pant",
    image: "/assets/image/pant1.jpg",
    favorite: true,
    discount: 10,
    description:
      "Everyday made better: we listen to customer feedback and fine-tune every detail to ensure quality, fit, and comfort.",
    parameters: {
      Material: "99% Cotton, 2% Elastane",
      Status: "Imported",
      Details:
        "This easy-wearing pant features a classic look that shifts from weekday to weekend without missing a beat.",
      Care: "With a jean-inspired silhouette, this 5-pocket stretch twill pant proves both laid back and office-appropriate.",
    },
    price: 14.94,
    countInStock: 1000,
    rating: 0,
    sold: 5000,
    position: "Singapore",
    numReviews: 0,
    type: "pant",
    transport: "express",
  },
  {
    name: "Amazon Essentials Men's Classic-Fit Wrinkle-Resistant Flat-Front Chino Pant (Available in Big & Tall)",
    image: "/assets/image/pant2.jpg",
    favorite: true,
    discount: 0,
    description:
      "A flat-front dressy chino that offers classic style all week long; made to be wrinkle-resistant and easy-care with a traditional relaxed look and fit.",
    parameters: {
      Material: "60% Cotton, 40% Elastane",
      Status: "Exported",
      Details:
        "Generous classic fit that sits at waist, roomy through seat and thigh, with a straight leg; zip fly with button closure, side pockets, and button pockets at the back.",
      Care: "Work made better: we listen to customer feedback and fine-tune every detail to ensure quality, fit, and comfort.",
    },
    price: 23.7,
    countInStock: 5488,
    rating: 0,
    sold: 156,
    position: "India",
    numReviews: 0,
    type: "pant",
    transport: "fast",
  },
  {
    name: "Champion Men's Joggers, Everyday Joggers, Lightweight, Comfortable Joggers for Men",
    image: "/assets/image/pant3.jpg",
    favorite: false,
    discount: 23,
    description: "Standard-fit men's joggers with a 31 inseam",
    parameters: {
      Material: "100% Cotton",
      Status: "Imported",
      TheFeel: "Soft, 6.1 oz. cotton blend feels great on the skin.",
      AddedComfort:
        " Elastic waistband and internal drawcord provide a custom fit.",
    },
    price: 19.99,
    countInStock: 100,
    rating: 0,
    sold: 250,
    position: "Malaysia",
    numReviews: 0,
    type: "pant",
    transport: "economical",
  },
  {
    name: "Essentials Women's Classic-Fit Short-Sleeve Crewneck T-Shirt",
    image: "/assets/image/shirt1.jpg",
    favorite: true,
    discount: 0,
    description: "Standard-fit men's joggers with a 31 inseam.",
    parameters: {
      Material: "56% Cotton, 38% Modal, 6% Spandex.",
      Status: "Imported",
      Feature:
        "No Closure closure. Close-but-comfortable fit with easy movement",
      Care: "Lightweight jersey cotton blend with stretch.",
    },
    price: 19.0,
    countInStock: 52,
    rating: 0,
    sold: 19,
    position: "Indonesia",
    numReviews: 0,
    type: "shirt",
    transport: "express",
  },
  {
    name: "Fruit of the Loom Men's Eversoft Cotton Short Sleeve Pocket T-Shirts, Breathable & Tag Free",
    image: "/assets/image/shirt2.jpg",
    favorite: false,
    discount: 35,
    description:
      "This is an assorted color pack; This pack may contain all solids, all prints or a combination.",
    parameters: {
      Material: "100% Cotton; Heathers: 90% Cotton, 10% Polyester.",
      Status: "Imported",
      Feature:
        "Machine Wash Warm Gentle Cycle. Colors Separately. Only Non-Chlorine Bleach When Needed. Tumble Dry Low. Cool Iron. Made with Breathable Eversoft Ringspun Cotton",
      Care: "Tag Free for Added Comfort. Moisture Wicking Keeping You Cool & Dry All Day",
    },
    price: 20.54,
    countInStock: 2000,
    rating: 0,
    sold: 1500,
    position: "Indonesia",
    numReviews: 0,
    type: "shirt",
    transport: "fast",
  },
  {
    name: "Columbia Men's Thistletown Hills Short Sleeve",
    image: "/assets/image/shirt3.jpg",
    favorite: true,
    discount: 39,
    description:
      "Crafted from a cotton and recycled polyester blend that provides a comfort stretch feel for an unrestricted range of motion — ready for any outing.",
    parameters: {
      Material: "60% Cotton, 40% Polyester.",
      Status: "Imported",
      Feature:
        "Machine Wash. The ultimate moisture management technology for the outdoors. Omni-Wick quickly moves moisture from the skin into the fabric where it spreads across the surface to quickly evaporate—keeping you cool and comfortable",
      Care: "This performance T-shirt is made for outdoor activity with soft, cotton-blend, sweat wicking fabric",
    },
    price: 24.99,
    countInStock: 278,
    rating: 0,
    sold: 196,
    position: "Vietnamese",
    numReviews: 0,
    type: "shirt",
    transport: "economical",
  },
  {
    name: "Skechers Men's Moreno Canvas Oxford Shoe",
    image: "/assets/image/shoe2.jpg",
    favorite: true,
    discount: 42,
    description: "Shaft measures approximately not_applicable from arch.",
    parameters: {
      Material: "Canvas.",
      Status: "Imported",
      Feature:
        "Shaft measures approximately not_applicable from arch. Goga Mat Arch. Air Cooled Memory Foam",
      Care: "Wide Fit ",
    },
    price: 46.03,
    countInStock: 323,
    rating: 0,
    sold: 500,
    position: "Portugal",
    numReviews: 0,
    type: "shoe",
    transport: "express",
  },
  {
    name: "PUMA Men's Grip Fusion Sport Golf Shoe",
    image: "/assets/image/shoe1.jpg",
    favorite: false,
    discount: 20,
    description: "Shaft measures approximately not_applicable from arch.",
    parameters: {
      Material: "50% Cotton, 50% Polyster.",
      Status: "Imported",
      Feature: "Rubber sole. Performance Mesh",
      Care: "Organic Traction",
    },
    price: 43.32,
    countInStock: 200,
    rating: 0,
    sold: 15,
    position: "France",
    numReviews: 0,
    type: "shoe",
    transport: "fast",
  },
  {
    name: "Skechers Men's Nampa Food Service Shoe",
    image: "/assets/image/shoe3.jpg",
    favorite: true,
    discount: 0,
    description:
      " #1,332 in Clothing, Shoes & Jewelry (See Top 100 in Clothing, Shoes & Jewelry) .",
    parameters: {
      Material: "100% Synthetic.",
      Status: "Imported",
      Feature: "Rubber sole. Memory Foam Footbed",
      Care: "Relaxed Fit. Slip Resistant ",
    },
    price: 39.99,
    countInStock: 425,
    rating: 0,
    sold: 98,
    position: "Mexico",
    numReviews: 0,
    type: "shoe",
    transport: "economical",
  },
];

module.exports = products;
