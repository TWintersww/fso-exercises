import { useState } from "react";

const useFilter = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleQueryChange = (event) => {
        setSearchQuery(event.target.value)
    }

    return {
        searchQuery,
        handleQueryChange,
    }
}

export default useFilter
