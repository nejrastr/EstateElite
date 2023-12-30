function getFormValues() {
    const minCijena = document.querySelector('input[placeholder="Minimalna cijena"]').value || null;
    const maxCijena = document.querySelector('input[placeholder="Maksimalna cijena"]').value || null;
    const minKvadratura = document.querySelector('input[placeholder="Minimalna kvadratura"]').value || null;
    const maxKvadratura = document.querySelector('input[placeholder="Maksimalna kvadratura"]').value || null;
  
    return {
      min_cijena: minCijena,
      max_cijena: maxCijena,
      min_kvadratura: minKvadratura,
      max_kvadratura: maxKvadratura,
    };
  }
  // funkcija za uzimanje unesenih vrijednosti
  const filterForm = document.getElementById('filterButton');
  
  filterForm.addEventListener('click', function (event) {
    event.preventDefault();
  
  
    const filterCriteria = getFormValues();
    spojiNekretnine(divStan, nekretnine, "Stan", filterCriteria);
    spojiNekretnine(divKuca, nekretnine, "Kuca", filterCriteria);
    spojiNekretnine(divPp, nekretnine, "Poslovni prostor", filterCriteria);
  });