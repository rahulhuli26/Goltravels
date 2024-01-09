document
  .getElementById("hotelForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const images = document.getElementById("images").value;
    const heading = document.getElementById("heading").value;
    const hotel_stars = document.getElementById("hotel_stars").value;
    const google_review = document.getElementById("google_review").value;
    const text = document.getElementById("text").value;
    const description = document.getElementById("description").value;
    const package_includes = document.getElementById("package_includes").value;
    const strickedout_price =
      document.getElementById("strickedout_price").value;
    const offer_percentage = document.getElementById("offer_percentage").value;
    const offer_price = document.getElementById("offer_price").value;

    console.log(
      images,
      heading,
      hotel_stars,
      google_review,
      text,
      description,
      package_includes,
      strickedout_price,
      offer_percentage,
      offer_price
    );

    try {
      const response = await fetch("http://localhost:3000/admin/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images,
          heading,
          hotel_stars,
          google_review,
          text,
          description,
          package_includes,
          strickedout_price,
          offer_percentage,
          offer_price,
        }),
      });

      const data = await response.json();
      console.log(data);

      // Handle the response from the backend
      if (response.ok) {
        console.log("signup successfully");
        window.location.href =
          "../../PackageHandling/Admin_Packages/admin.html";
      }
    } catch (error) {
      console.error("Error during upload packages:", error);
    }
  });
