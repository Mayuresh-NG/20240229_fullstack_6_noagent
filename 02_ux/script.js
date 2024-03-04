document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("filterButton");
    const sortButton = document.getElementById("sortButton");
    const filterContent = document.getElementById("filterContent");
    const sortContent = document.getElementById("sortContent");

    filterButton.addEventListener("click", function() {
        filterContent.classList.add("active");
        sortContent.classList.remove("active");
        filterButton.classList.add("active");
        sortButton.classList.remove("active");
    });

    sortButton.addEventListener("click", function() {
        filterContent.classList.remove("active");
        sortContent.classList.add("active");
        filterButton.classList.remove("active");
        sortButton.classList.add("active");
    });
});
