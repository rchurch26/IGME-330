//Mobile Menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", () =>
{
    navbarMenu.classList.toggle("is-active");
})

if(navbarMenu.classList.toggle("is-active"))
{
    navbarMenu.classList.toggle("has-text-weight-bold");
}