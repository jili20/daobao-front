const title = '灵魂深触-经历网'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle}-${title}`
    }
    return `${title}`
}
