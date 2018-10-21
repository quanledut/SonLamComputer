const createPaginationQueryByAggregate = async (aggregate, query) => {
    let {page, limit} = query

    page = parseInt(page)
    limit = parseInt(limit)

    const count = await aggregate.count("total")
    // const total = count[0].total
    if (!page) page = 1
    if (!limit) limit = 10

    if (count.length == 0) return {page, pages:1, limit:10, skip:0, total:0}
    console.log(page, limit, count)
    const total = count[0].total

    const pages = Math.ceil(total / limit)
    const skip = (page - 1) * limit

    return {page, pages, limit, skip, total}
}

module.exports = {
    createPaginationQueryByAggregate
}