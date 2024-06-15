
export const homePage = async(req, res) => {
    const locals={
        title: 'Note App',
        description: 'A simple note app'
    }
    res.render('index',{locals,layout:"../views/layouts/front-page"})
}

export const about = async (req, res) => {
    const locals={
        title: 'About',
        description: 'About the note app'
    }
    res.render('about',locals)
}