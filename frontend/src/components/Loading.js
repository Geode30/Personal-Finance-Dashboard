import React from "react";

export default function Loading({ isLoading }) {
    return (
        <div className={`${isLoading ? 'flex' : 'hidden'} items-center justify-center min-h-screen`}>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
    )
}