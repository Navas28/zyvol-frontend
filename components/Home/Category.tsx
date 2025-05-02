import React from "react";

const Category = async () => {
    return (
        <div className="pt-16 pb-12">
            <h1 className="text-center font-bold text-2xl capitalize">Short by category</h1>
            <div className="mt-12 w-4/5 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md">
                    <h1 className="text-sm sm:text-base md:text-lg font-bold">Category 1</h1>
                </div>
                <div className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md">
                    <h1 className="text-sm sm:text-base md:text-lg font-bold">Category 1</h1>
                </div>
                <div className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md">
                    <h1 className="text-sm sm:text-base md:text-lg font-bold">Category 1</h1>
                </div>
                <div className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md">
                    <h1 className="text-sm sm:text-base md:text-lg font-bold">Category 1</h1>
                </div>
            </div>
        </div>
    );
};

export default Category;
