products = [
    {
        '_id':1,
        'name':"Cashews",
        'src':"https://cdn.dribbble.com/users/2122681/screenshots/4254443/fuze-branding-cashew-nuts-illustrations.jpg",
        'benefits':"Cashews are low in sugar and rich in fiber, heart-healthy fats, and plant protein. They're also a good source of copper, magnesium, and manganese - nutrients important for energy production, brain health, immunity, and bone health.",
        'price':110,
        'count':0,
        'countInStock': 10,
        'rating': 1.5,
        'numReviews': 12,
    },
    {
        '_id':2,
        'name':"Almonds",
        'src':"https://cdn.dribbble.com/users/32350/screenshots/9782615/media/90361fe0649c0102feb45b5f4eea8dc6.png?compress=1&resize=1000x750",
        'benefits':"A healthy substitute for conventional snacking options, generally high in sugar, almonds can be enjoyed anytime. Almonds are rich in anti-oxidants and have zero cholesterol. They are known to provide relief from constipation, respiratory issues and heart disorders, besides being great for hair, skin and teeth.",
        'price':140,
        'count':0,
        'countInStock':0,
        'rating': 4.0,
        'numReviews': 12,
    },
    {
        '_id':3,
        'name':"Dates",
        'src':"https://cdn.dribbble.com/users/959248/screenshots/2842099/dates.png?compress=1&resize=800x600",
        'benefits':"They are used in different types of sweet dishes and can also be consumed on their own. The dry fruit is rich in vitamins, proteins, minerals and natural sugar and is believed to provide relief from constipation, apart from treating anaemia.",
        'price':38,
        'count':0,
        'countInStock': 10,
        'rating': 4.5,
        'numReviews': 12,
    },
    {
        '_id':4,
        'name':"Walnut",
        'src':"https://cdn.dribbble.com/users/146773/screenshots/4581738/drib3.png?compress=1&resize=800x600",
        'benefits':"This shelled nutty delight is extremely nutritious. It is loaded with vital Omega-3 fatty acids, dietary fibres, proteins, anti-oxidants, vitamins and minerals. ",
        'price':180,
        'count':0,
        'countInStock': 10,
        'rating': 4.5,
        'numReviews': 12,
    },
    {
        '_id':5,
        'name':"Raisins",
        'src':"https://cdn.dribbble.com/users/2400270/screenshots/4819600/raisinets.png?compress=1&resize=400x300",
        'benefits':"Raisins are made from dehydrated grapes and are used in both sweet and savoury food preparations. They are good for health and have been known to reduce acidity and help in digestion.",
        'price':40,
        'count':0,
        'countInStock': 10,
        'rating': 4.0,
        'numReviews': 12,
    },
    {
        '_id':6,
        'name':"Pistachios",
        'src':"data:image/jpeg;base64,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",
        'benefits':"Pistachios are good for the heart as they help in lowering bad cholesterol level. They also help prevent diabetes and boost immunity.",
        'price':160,
        'count':0,
        'countInStock': 10,
        'rating': 3.5,
        'numReviews': 12,
    },
    {
        '_id':7,
        'name':"Green Tea",
        'src':"https://cdn.dribbble.com/users/38195/screenshots/14163131/media/64c1e52709bab83c6e4f66d2c057bd6d.png?compress=1&resize=1000x750",
        'benefits':"Green tea is packed full of health-promoting compounds. Regularly drinking green tea can help you lose weight and reduce your risk of several diseases, including diabetes, heart disease and cancer. ",
        'price':150,
        'count':0,
        'countInStock': 10,
        'rating': 3.2,
        'numReviews': 12,
    },
  ]
  
  
  