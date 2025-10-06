export default {
    home: {
        path: '/',
        title: 'Home',
        description: 'Demonstrated here is a simple page which all of its assets are fetched in parallel.',
        data: [
            {
                url: "https://jsonplaceholder.typicode.com/todos",
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                preconnect: ['https://raw.githubusercontent.com']
            },

        ]
    },
    about: {
        path: '/about',
        title: 'About',
        description: 'Demonstrated here is a simple page which all of its assets are fetched in parallel.'
    },
    contact: {
        path: '/contact',
        title: 'Contact',
        description: 'Demonstrated here is a simple page which all of its assets are fetched in parallel.'
    },

}
