// Trial CTA
let trialBtn = document.querySelector('#trialClose')
let trialBox = document.querySelector('#trialBox')
let setupBox = document.querySelector('#setupBox')

// Close the CTA when the 'close' button is clicked and adjust the top margin
trialBtn.addEventListener('click', () => {
  trialBox.style.visibility = "hidden";

  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  // Set a different margin adjustment for mobile devices
  if (screenWidth <= 390) {
    setupBox.style.marginTop = '-100px'
  } else {
    setupBox.style.marginTop = '-64px'
  }
});


// Function to close dropdown menu
function closeDropdown(btn, menu) {
  menu.style.display = 'none';
  btn.classList.remove('active');
  btn.ariaExpanded = 'false'
}
// Function to toggle dropdown
let currentDropdown = null
let previousButton

function openDropdown(button, dropdown) {
  let dropdownBtn = document.querySelector(`#${button}`);
  let dropdownBox = document.querySelector(`#${dropdown}`);

  dropdownBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from reaching the window

    // Close the currently open dropdown if it's different from the clicked one
    if (currentDropdown && currentDropdown !== dropdownBox) {
      closeDropdown(previousButton, currentDropdown)
    }

    // Toggle the visibility of the clicked dropdown
    dropdownBox.style.display = (dropdownBox.style.display === 'block') ? 'none' : 'block';
    // Store a reference to the currently open dropdown
    currentDropdown = dropdownBox;
    // Add 'active' class to the clicked button
    dropdownBtn.classList.toggle('active');
    // Store a reference to the clicked button
    previousButton = dropdownBtn;
    //Toggle the accessibilty control
    dropdownBtn.ariaExpanded = (dropdownBtn.ariaExpanded === 'true') ? 'false' : 'true'
  });

  window.addEventListener('click', (event) => {
    // Close the dropdown if the click is outside the dropdown and not on the toggle button
    if (!dropdownBox.contains(event.target) && event.target !== dropdownBtn) {
      closeDropdown(dropdownBtn, dropdownBox)
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeDropdown(dropdownBtn, dropdownBox)
    }
  })
}

// Alert dropdown
openDropdown('notificationBox', 'alertBox');
// Profile dropdown
openDropdown('profile', 'profileBox');


// Profile links
let profileBox = document.querySelector('#profileBox');

profileBox.addEventListener('click', () => {
  // Change the URL to the website you want to open
  let websiteURL = 'https://accounts.shopify.com/lookup?rid=125abd49-b4b2-456f-8b96-bbd0ecb07b96';

  // Open the website
  window.location.href = websiteURL;
});


// Toggle visibility of setup steps
let content = document.querySelector('#setupSection2');
let chevron = document.querySelector('#chevronIcon');

chevron.addEventListener('click', () => {
  content.style.display = (content.style.display == 'block') ? 'none' : 'block';

  // Toggle between the chevron buttons
  if (content.style.display === 'block') {
    chevron.querySelector('path').setAttribute('d', 'M15.0303 12.2803C14.7374 12.5732 14.2626 12.5732 13.9697 12.2803L10.5 8.81066L7.03033 12.2803C6.73744 12.5732 6.26256 12.5732 5.96967 12.2803C5.67678 11.9874 5.67678 11.5126 5.96967 11.2197L9.96967 7.21967C10.2626 6.92678 10.7374 6.92678 11.0303 7.21967L15.0303 11.2197C15.3232 11.5126 15.3232 11.9874 15.0303 12.2803Z');
  } else {
    chevron.querySelector('path').setAttribute('d', 'M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197 8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197 13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z');
  }
})


// Function to toggle between setup steps
function togglePanel(headerText) {
  // Select the panel containing the clicked header text and display the hidden content of the panel
  let panel = headerText.parentElement.parentElement
  let panelContent = panel.querySelector('.panel-content');
  panelContent.classList.toggle('visible');

  // Select all panels in the setup box and close any open panel once the current panel displays its content
  let panels = document.querySelectorAll('.panel');
  panels.forEach((otherPanel) => {
    if (otherPanel !== panel) {
      otherPanel.querySelector('.panel-content').classList.remove('visible');
      otherPanel.classList.remove('panel-bg-color')
    }
  });

  // Set the background color for current panel
  panel.classList.toggle('panel-bg-color')
}


// Hide placeholder text when the search bar gets focus and restore text when the bar is out of focus
let searchBar = document.querySelector('.search-bar')
let placeholderText = searchBar.getAttribute('placeholder')

searchBar.addEventListener('focus', () => {
  searchBar.setAttribute('placeholder', '')
})
searchBar.addEventListener('blur', () => {
  searchBar.setAttribute('placeholder', placeholderText)
})


// Toggle checkmark icons and update setup progress as checkbox is marked or unmarked
let checkmarks = document.querySelectorAll('.checkmark-btn')
let update = document.querySelector('#progressCount')
let count = 0

checkmarks.forEach(checkmark => {
  checkmark.addEventListener('click', () => {
    let unchecked = checkmark.querySelector('.unchecked')
    let spinner = checkmark.querySelector('.loading-spinner')
    let checked = checkmark.querySelector('.completed-checkmark')

    if (checkmark.classList.contains('checkbox-done')) {
      markAsNotDone(checkmark, unchecked, spinner, checked)
    } else {
      markAsDone(checkmark, unchecked, spinner, checked)
    }
  })
})

function markAsDone(checkmark, unchecked, spinner, checked) {
  // Hide unchecked icon and display spinner
  unchecked.classList.add('hidden')
  spinner.classList.remove('hidden')
  // Mark as done after 2 seconds
  setTimeout(() => {
    spinner.classList.add('hidden')
    checked.classList.remove('hidden')
  }, 2000)
  // Add a new class to identify a marked checkbox
  checkmark.classList.add('checkbox-done')
  // Update setup progress
  count += 1
  update.innerHTML = count
  // Modify aria-label content
  checkmark.ariaLabel.replace('as done', 'as not done')
}

function markAsNotDone(checkmark, unchecked, spinner, checked) {
  // Hide checked icon and display spinner
  checked.classList.add('hidden')
  spinner.classList.remove('hidden')
  // Hide spinner after 2 seconds and display unchecked icon
  setTimeout(() => {
    spinner.classList.add('hidden')
    unchecked.classList.remove('hidden')
  }, 2000)
  // Remove the identifier class
  checkmark.classList.remove('checkbox-done')
  // Update setup progress
  count -= 1
  update.innerHTML = count
  // Modify aria-label content
  checkmark.ariaLabel.replace('as not done', 'as done')
}