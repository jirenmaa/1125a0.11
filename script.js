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

    folders.forEach((siblingFolder) => {
      if (siblingFolder !== folder) siblingFolder.classList.add("disabled");
    });

    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

    // Lift entire folder slightly (relative, so row position unaffected)
    tl.to(folder, {
      yPercent: -10,
      duration: 0.12,
    }, 0);

    // Fan out cards at the same time
    tl.to(previewImages, {
      yPercent: -135,
      stagger: 0.015,
      duration: 0.12,
      rotation: (i) => {
        const minRot = -15;
        const maxRot = 15;
        const step = (maxRot - minRot) / (previewImages.length - 1);
        return minRot + i * step + gsap.utils.random(-1.5, 1.5);
      },
    }, 0);
  });

  folder.addEventListener("mouseleave", () => {
    if (isMobile) return;

    folders.forEach((siblingFolder) => {
      siblingFolder.classList.remove("disabled");
    });

    const tl = gsap.timeline({ defaults: { ease: "back.in(1.7)" } });

    tl.to(previewImages, {
      yPercent: 0,
      rotation: 0,
      stagger: 0.01,
      duration: 0.1,
    }, 0);

    tl.to(folder, {
      yPercent: 0,
      duration: 0.1,
    }, 0);
  });
});



