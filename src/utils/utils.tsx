const scrollToElement = (id: string, offset = 86) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// const scrollToElement = (elementId: string) => {
//   const element = document.getElementById(elementId);
//   if (element) {
//     element.scrollIntoView({ behavior: 'smooth', block: "start" });
//   }
// };

export { scrollToElement };