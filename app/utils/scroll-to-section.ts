export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    // Calcular a posição considerando o header fixo (altura de 80px)
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}
