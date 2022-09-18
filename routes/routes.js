const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoute')
const uploadRoutes = require('./uploadRoutes')

const routes = [
    {
        path: '/auth',
        handler: authRoutes
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/uploads',
        handler: uploadRoutes
    },
    {
        path: '/',
        handler: (req, res) => {
            res.send('<h1>Hello, Welcome this is Home</h1>')
        }
    },
    {
        path: '*',
        handler: (req, res) => {
            res.send('<h1>404, Page Not Found</h1>')
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if (r.path === '/' || r.path === '*') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}