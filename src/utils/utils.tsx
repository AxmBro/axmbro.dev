const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  const header = document.getElementById('header');
  const offset = header ? header.offsetHeight : 0;
  console.log(offset)

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export { scrollToElement };