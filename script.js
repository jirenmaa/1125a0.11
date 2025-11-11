const folders = document.querySelectorAll(".folder");
const folderWrappers = document.querySelectorAll(".folder-wrapper");

let isMobile = window.innerWidth < 1000;

function setInitialPositions() {
  gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
}

// document.addEventListener("DOMContentLoaded", setInitialPositions);

folders.forEach((folder, index) => {
  const previewImages = folder.querySelectorAll(".folder-preview-img");

  folder.addEventListener("mouseenter", () => {
    if (isMobile) return;

    // Dim siblings
    folders.forEach((siblingFolder) => {
      if (siblingFolder !== folder) siblingFolder.classList.add("disabled");
    });

    // Quick lift
    gsap.to(folderWrappers[index], {
      y: 0,
      duration: 0.15,
      ease: "back.out(1.7)",
    });

    // Quick card fan
    previewImages.forEach((img, imgIndex) => {
      const minRot = -18;
      const maxRot = 18;
      const step = (maxRot - minRot) / (previewImages.length - 1);
      const rotation = minRot + imgIndex * step + gsap.utils.random(-2, 2);

      gsap.to(img, {
        y: "-100%",
        rotation,
        duration: 0.15,
        ease: "back.out(1.7)",
        delay: imgIndex * 0.015, // much shorter delay
      });
    });
  });

  folder.addEventListener("mouseleave", () => {
    if (isMobile) return;

    folders.forEach((siblingFolder) => {
      siblingFolder.classList.remove("disabled");
    });

    gsap.to(folderWrappers[index], {
      y: 20,
      duration: 0.15,
        ease: "back.out(1.7)",
    });

    // Snap back fast
    previewImages.forEach((img, imgIndex) => {
      gsap.to(img, {
        y: "0%",
        rotation: 0,
        duration: 0.15,
        ease: "back.out(1.7)",
        delay: imgIndex * 0.015,
      });
    });
  });

});

