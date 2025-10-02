const getPathname = () => {
    let { pathname } = window.location

    if (pathname !== '/') pathname = pathname.replace(/\/$/, '')

    return pathname
}

const getPage = (pathname = getPathname()) => {
    const potentiallyMatchingPages = pages
        .map(page => ({ ...isMatch(pathname, page.path), ...page }))
        .filter(({ match }) => match)

    return potentiallyMatchingPages.find(({ exactMatch }) => exactMatch) || potentiallyMatchingPages[0]
}

const isMatch = (pathname, path) => {
    if (pathname === path) return { exactMatch: true, match: true }
    if (!path.includes(':')) return { match: false }

    const pathnameParts = pathname.split('/')
    const pathParts = path.split('/')
    const match = pathnameParts.every((part, ind) => part === pathParts[ind] || pathParts[ind]?.startsWith(':'))

    return {
        match,
        exactMatch: match && pathnameParts.length === pathParts.length
    }
}
const preloadScript = (scripts) => {
    const children = scripts.map((script) => {
        return Object.assign(document.createElement("link"), {
            rel: "preload",
            href: "/" + script,
            as: "script",
        });
    });

    document.head.append(...children);
};

const currentPage = getPage()

if (currentPage) {
    const { path, title, scripts } = currentPage

    preloadScript(scripts)

    if (title) document.title = title
}