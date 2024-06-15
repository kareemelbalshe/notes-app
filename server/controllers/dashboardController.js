export const dashboard = (req, res) => {
    const locals={
        title: 'Dashboard',
        description: 'Dashboard for the note app'
    }

    res.render('dashboard/index',{locals,layout:"../views/layouts/dashboard"})
}