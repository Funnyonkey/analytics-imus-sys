$(document).ready(function(){
	// Update status
	$("select[name='status-application']").change(function(){
		const appId = $(this).parent().parent().find("input[name='applicationId']").val();
		const userId = $(this).parent().parent().find("input[name='user_id']").val();
		const newApplicationStatus = $(this).val();

		$.ajax({
			url: "/update_application_status",
			type: "POST",
			data: { id: appId, newStatus: newApplicationStatus, userId: userId},
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.error(error);
			}
		});
	})
	/* Display the result every time the inputs search is changed */
	/* To be fix: Use session to use one controller for default and search application by name */
	$(".search").on("input", function(){

		let searchVal = $(this).val().trim();
		if(searchVal !== ""){
			$.ajax({
				url: "/search/"+searchVal,
				type: "POST",
				data: { searchVal },
				success: function(response){
					// localStorage.setItem('total', response.length);
					$(".application").remove();
					for(let i = 0; i < response.length; i++){
						/* container*/
						let container = document.createElement("div");
						container.className = "row application d-flex justify-content-center align-items-center";
						{/* <input value="<%=row[i].id%>" type="hidden" name="applicationId"></input> */}

						let idInput = document.createElement("input");
						idInput.setAttribute("name", "applicationId");
						idInput.setAttribute("value", response[i].id);
						idInput.setAttribute("type", "hidden");

						let userIdInput = document.createElement("input");
						userIdInput.setAttribute("name", "user_id");
						userIdInput.setAttribute("value", response[i].user_id);
						userIdInput.setAttribute("type", "hidden");

						let divName = document.createElement("div");
						divName.className = "col-lg-3 col-md-3 col-sm-3 col-3";
						divName.textContent = response[i].firstname + " " + response[i].surname;

						let divEmail = document.createElement("div");
						divEmail.className = "col-lg-3 col-md-3 col-sm-3 email";
						divEmail.textContent = response[i].email;

						let divDate = document.createElement("div");
						divDate.className = "col-lg-2 col-md-2 col-sm-2 col-3";
						let createdAt = new Date(response[i].created_at); 
						let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
						let monthName = months[createdAt.getMonth()]; // Get the month name from the array
						let date = createdAt.getDate();
						let year = createdAt.getFullYear();
						let formattedDate = monthName + ' ' + date + ', ' + year;
						divDate.textContent = formattedDate;

						// Create the parent div
						let divStatus = document.createElement("div");
						divStatus.className = "col-lg-2 col-md-2 col-sm-2 col-3";

						// Create the <select> element
						let selectStatus = document.createElement("select");
						selectStatus.className = "form-control";
						selectStatus.setAttribute("name", "status-application");

						// Create the options
						let optionPending = document.createElement("option");
						optionPending.value = "pending";
						optionPending.textContent = "Pending";
						if (response[i].status === "pending") {
							optionPending.selected = true; // Set as selected if condition is met
						}

						let optionOnProcess = document.createElement("option");
						optionOnProcess.value = "on-process";
						optionOnProcess.textContent = "On-Process";
						if (response[i].status === "on-process") {
							optionOnProcess.selected = true; // Set as selected if condition is met
						}

						let optionRejected = document.createElement("option");
						optionRejected.value = "rejected";
						optionRejected.textContent = "Rejected";
						if (response[i].status === "rejected") {
							optionRejected.selected = true; // Set as selected if condition is met
						}

						let optionAccepted = document.createElement("option");
						optionAccepted.value = "accepted";
						optionAccepted.textContent = "Accepted";
						if (response[i].status === "accepted") {
							optionAccepted.selected = true; // Set as selected if condition is met
						}
						selectStatus.append(optionPending, optionOnProcess, optionRejected, optionAccepted);

						divStatus.append(selectStatus);


						let divAction = document.createElement("div");
						divAction.className = "col-lg-2 col-md-2 col-sm-2 col-3 action p-0";

						let a = document.createElement("a");
						a.setAttribute("href", "/view_application/"+response[i].id);

						let viewIcon = document.createElement("img");
						viewIcon.className = "viewIcon";
						viewIcon.setAttribute("src", "/images/view_gray.svg");
						viewIcon.setAttribute("alt", "View icon");

						a.append(viewIcon);
						divAction.append(a);

						let deleteIcon = document.createElement("img");
						deleteIcon.className = "deleteIcon";
						deleteIcon.setAttribute("src", "/images/delete_gray.svg");
						deleteIcon.setAttribute("alt", "Delete icon");
						deleteIcon.setAttribute("data-bs-toggle", "modal");
						deleteIcon.setAttribute("data-bs-target", "#deleteModal");
						divAction.append(deleteIcon);

						let downloadButton = document.createElement("button");
						downloadButton.setAttribute("type", "submit");
						let downloadIcon = document.createElement("img");
						downloadIcon.className = "download-icon";
						downloadIcon.setAttribute("src", "/images/download.svg");
						downloadIcon.setAttribute("alt", "Download icon");
						downloadButton.append(downloadIcon);
						divAction.append(downloadButton);
						
						container.append(idInput);
						container.append(userIdInput);
						container.append(divName);
						container.append(divEmail);
						container.append(divDate);
						container.append(divStatus);
						container.append(divAction);
						
						$(".content").append(container);

						/* Footer */
						$("footer a").remove();
						
						// for(let page = 1; page <=  Math.ceil(response.length/9); page++){
						// 	let a = document.createElement("a");
						// 	a.setAttribute("href", "/dashboard/"+page);
						// 	a.textContent = page;
						// 	$("footer").append(a);
						// }
					}
				},
				error: function(error){
					console.error(error);
				}
			});
		}
		if(searchVal === ""){
			// localStorage.setItem('total', '');
			location.reload();
		}
	});
	$(".application").click(function(){
        let applicantUserId = $(this).find("input[name='user_id']").val();
        localStorage.setItem("applicant_user_id", applicantUserId);
    });
	
    $(".view_account").click(function(){
        window.location.href = "/view_account";
    });
	/* Change icon when view or delete icon is hovered over */
	let deleteGray = "/images/delete_gray.svg"; 
    let deleteRed = "/images/delete_red.svg";
    $(".deleteIcon").hover(
        function(){
            $(this).attr("src", deleteRed);
        },
        function(){
            $(this).attr("src", deleteGray);
        }
    );
	let viewGray = "/images/view_gray.svg"; 
    let viewRed = "/images/view_green.svg";
    $(".viewIcon").hover(
        function(){
            $(this).attr("src", viewRed);
        },
        function(){
            $(this).attr("src", viewGray);
        }
    );
	/*  */
	let selectedApplication;
	$(".deleteIcon").click(function(){
		selectedApplication = $(this).parent().parent();
	});
	/* Delete */
	$("#btnDelete").click(function(){
		let id = $(selectedApplication).find("input[name='applicationId']").val();
		$.ajax({
			url: "/delete/" + id,
			type: "DELETE",
			success: function(response){
				console.log(response);
				if(response){
					window.location.href = "/dashboard";
				}
			},
			error: function(error){
				console.error(error);
			}
		});
	});

	/* Download */
	$(document).on("click", ".download-icon", function(){
		const id = $(this).parent().parent().parent().find("input").val();
		const link = document.createElement('a');
		link.href = `/download_form/${id}`;
		link.download = 'form.pdf';
	
		// Append the link to the body (required for Firefox)
		document.body.appendChild(link);
	
		// Trigger a click on the link to download the file
		link.click();
	
		// Remove the link from the document
		document.body.removeChild(link);
	});
	
});