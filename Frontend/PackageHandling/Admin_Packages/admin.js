$(document).ready(function () {
  // Fetch hotel data on page load
  fetchHotelData();
});

function fetchHotelData() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/admin/getHotels",
    success: function (data) {
      renderHotelCards(data);
    },
  });
}

function renderHotelCards(hotels) {
  const hotelContainer = $("#hotelContainer");

  hotels.forEach((hotel) => {
    const card = `
            <div class="card mb-4">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${hotel.images}" class="card-img" alt="Hotel Image">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${hotel.heading}</h5>
                            <p class="card-text">Hotel Stars: ${hotel.hotel_stars}</p>
                            <p class="card-text">Google Review: ${hotel.google_review}</p>
                            <p class="card-text">${hotel.text}</p>
                            <p class="card-text">${hotel.description}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">Package Details</h5>
                            <p class="card-text">Strikedout Price: ${hotel.strickedout_price}</p>
                            <p class="card-text">Offer Percentage: ${hotel.offer_percentage}%</p>
                            <p class="card-text">Offer Price: ${hotel.offer_price}</p>
                            <p class="card-text">${hotel.package_includes}</p>
                            <button class="btn btn-primary" onclick="editHotel(${hotel.id})" data-toggle="modal" data-target="#editHotelModal">Edit</button>
                            <button class="btn btn-danger" onclick="deleteHotel(${hotel.id})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    hotelContainer.append(card);
  });
}

$(document).ready(function () {
  editHotel();
});
// Function to fetch hotel data for editing using hotelId
function editHotel(hotelId) {
  // AJAX request to fetch hotel data by ID
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/admin/getHotels/${hotelId}`,
    success: function (data) {
      // Display a form in the modal with pre-filled values
      displayEditForm(data);
    },
    error: function () {
      alert("Error fetching hotel data for editing.");
    },
  });
  console.log(hotelId);
}

// Function to display a form in the modal with pre-filled values
function displayEditForm(hotelData) {
  // Dynamically update the modal content
  const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">Edit Hotel</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="editHotelForm">
                    <div class="form-group">
                        <label for="editHeading">Heading:</label>
                        <input type="text" class="form-control" id="editHeading" value="${hotelData.heading}" required>
                    </div>
                    <div class="form-group">
                        <label for="editHotelStars">Hotel Stars:</label>
                        <input type="number" class="form-control" id="editHotelStars" value="${hotelData.hotel_stars}" required>
                    </div>
                    <div class="form-group">
                        <label for="editGoogleReview">Google Review:</label>
                        <input type="number" class="form-control" id="editGoogleReview" value="${hotelData.google_review}" step="0.1" required>
                    </div>
                    <!-- Add other form fields as needed -->

                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>
        `;

  // Set the modal content
  $("#editHotelModal .modal-content").html(modalContent);

  // Handle form submission
  $("#editHotelForm").submit(function (event) {
    event.preventDefault();
    // Call the function to update hotel data based on the submitted form
    updateHotel(hotelData.id);
  });

  // Show the modal
  $("#editHotelModal").modal("show");
}

// Function to update hotel data
function updateHotel(hotelId) {
  // Extract values from the form
  const updatedData = {
    heading: $("#editHeading").val(),
    hotel_stars: $("#editHotelStars").val(),
    google_review: $("#editGoogleReview").val(),
    // Add other fields as needed
  };

  // AJAX request to update hotel data
  $.ajax({
    type: "PUT",
    url: `http://localhost:3000/admin/getHotels/${hotelId}`,
    contentType: "application/json",
    data: JSON.stringify(updatedData),
    success: function (response) {
      alert(response.message);
      // Optionally, refresh the UI to reflect the updated data
      fetchHotelData();
      // Close the modal after updating
      $("#editHotelModal").modal("hide");
    },
    error: function () {
      alert("Error updating hotel data.");
    },
  });
}

// $(document).ready(function () {
//   // Fetch hotel data on page load
//   fetchHotelData();

//   // ... (previous functions)

//   // Function to delete a hotel
//   function deleteHotel(hotelId) {
//     if (confirm("Are you sure you want to delete this hotel?")) {
//       // AJAX request to delete hotel by ID
//       $.ajax({
//         type: "DELETE",
//         url: `http://localhost:3000/admin/deleteHotels/${hotelId}`,
//         success: function (response) {
//           alert(response.message);
//           // Refresh the UI after deleting
//           fetchHotelData();
//         },
//         error: function () {
//           alert("Error deleting hotel.");
//         },
//       });
//     }
//   }
//   deleteHotel();

//   // ... (other functions)
// });

$(document).ready(function () {
  // Fetch hotel data on page load
  fetchHotelData();

  // ... (previous functions)

  // Function to delete a hotel
  function deleteHotel(hotelId) {
    if (confirm("Are you sure you want to delete this hotel?")) {
      // AJAX request to delete hotel by ID
      $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/admin/deleteHotels/${hotelId}`,
        success: function (response) {
          alert(response.message);
          // Remove the deleted hotel card from the UI
          removeHotelCard(hotelId);
        },
        error: function () {
          alert("Error deleting hotel.");
        },
      });
    }
  }

  // Function to remove a hotel card from the UI
  function removeHotelCard(hotelId) {
    // Find and remove the hotel card with the specified ID
    $(`#hotelCard${hotelId}`).remove();
  }

  // ... (other functions)
});
