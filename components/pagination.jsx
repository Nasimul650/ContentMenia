import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import Link from "next/link";



const Paginate = () => {
    
    return (
        <Pagination
        className=""
        count={4}
        page={1}
        variant="outlined"
        color="primary"
        renderItem={ (item) => (
            <PaginationItem { ... item} component={Link} to={`/posts?page=${1}`} />
        )}
        />
    )
}

export default Paginate;