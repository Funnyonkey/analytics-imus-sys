window.onload = async function () {

    let total;
    let totalMale;
    let totalFemale;

    try {
        const response1 = await $.ajax({
            url: "/count_form",
            type: "GET"
        });
        total = parseInt(response1.total);
        $(".total_form").append(response1.total);

        const response2 = await $.ajax({
            url: "/count_male",
            type: "GET"
        });
        totalMale = Math.round((parseInt(response2.total_male)/total) * 100);

        const response3 = await $.ajax({
            url: "/count_female",
            type: "GET"
        })
        totalFemale = Math.round((parseInt(response3.total_female)/total) * 100);

    } catch (error) {
        console.error(error);
    }

    /* TOTAL APPLICATION AND TOTAL GENDER (MALE AND FEMALE) */
    const date = new Date();
    const monthName = date.toLocaleString('default', { month: 'long' });
    let options = {
        title: {
            text: "Applicants Gender"
        },
        subtitles: [{
            text: ``
        }],
        theme: "light1",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: totalMale, label: "Male" },
                { y: totalFemale, label: "Female" },
            ]
        }]
    };
    $("#pieGraph").CanvasJSChart(options); /* Add data to the graph */
    
    /*EMPLOYED*/
    let totalEmployed = 0;
    let employedPieGraph = {
        title: {
            text: "Employment Status: Employed"
        },
        subtitles: [{
            // text: `Total: ${totalEmployed}`
            text: ``
        }],
        theme: "light1",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: []
        }]
    };
    let employed_data_points = employedPieGraph.data[0].dataPoints;
    try{
        const arr = await $.ajax({
            url: "/get_top_employed",
            type: "GET"
        })
        
        let employed = arr.employed
        totalEmployed = parseInt(employed[0].self_employed_count) + parseInt(employed[0].wage_employed_count)
        // employedPieGraph.subtitles[0].text = "Total: " + totalEmployed;
        let totalSelfEmployed = Math.round(parseInt(employed[0].self_employed_count)/totalEmployed * 100);
        employed_data_points.push({ y: totalSelfEmployed, label: "SELF EMPLOYED" });
        let totalWageEmployed = Math.round(parseInt(employed[0].wage_employed_count)/totalEmployed * 100);
        employed_data_points.push({ y: totalWageEmployed, label: "WAGE EMPLOYED" });
        
    } catch (error) {
        console.error(error);
    }
    $("#employedPieGraph").CanvasJSChart(employedPieGraph); /* Add data to the graph */
    

    /*UNEMPLOYED*/
    let unemployedPieGraph = {
        title: {
            text: "Employment Status: Unemployed"
        },
        subtitles: [{
            // text: `As of ${monthName}, ${date.getFullYear()}`
            text: ``
        }],
        theme: "light5",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: []
        }]
    };
    let unemployed_data_points = unemployedPieGraph.data[0].dataPoints;
    try{
        const arr = await $.ajax({
            url: "/get_top_unemployed",
            type: "GET"
        })
        let unemployed = arr.unemployed;
        console.log(unemployed)
        let totalUnemployed = 0;
        for(let j = 0; j < unemployed.length; j++){
            totalUnemployed += parseInt(unemployed[j].count);
        }
        for(let i = 0; i < unemployed.length; i++){
            totalEmployed += parseInt(unemployed[i].count);
            let empType = unemployed[i].unemployed_type;
            let yValue = Math.round(parseInt(unemployed[i].count)/totalUnemployed * 100);
            unemployed_data_points.push({ y: yValue, label: empType });
        }

    } catch (error) {
        console.error(error);
    }
    $("#unemployedPieGraph").CanvasJSChart(unemployedPieGraph); /* Add data to the graph */
    
    /*PREFERRED OCCUPATION*/
    var employmentStatus = {
        animationEnabled: true,
        title: {
            text: `Top 10 Preferred Occupation of Applicant`
        },
        axisY: {
            title: "Percentage",
            suffix: "%"
        },
        axisX: {
            title: "Occupation"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };
    let data_points = employmentStatus.data[0].dataPoints;

    try{
        const occupation = await $.ajax({
            url: "/get_top_five_occupation",
            type: "GET"
        })
        //  {occupation: 'PROFESSIONAL GAMER', count: 3}
        let occupationArr = occupation.occupation;
        let totalOccupation = 0;
        for(let j = 0; j < occupationArr.length; j++){
            totalOccupation += parseInt(occupationArr[j].count);
        }
        for(let i = 0; i < occupationArr.length; i++){
            let occupation = occupationArr[i].occupation;
            let occupationYValue = Math.round(parseInt(occupationArr[i].count)/totalOccupation * 100);

            data_points.push({ label: occupation, y: occupationYValue })
        }

    } catch (error) {
        console.error(error);
    }

    $("#barGraph").CanvasJSChart(employmentStatus); /* Add data to the graph */

    /*PREFERRED WORK LOCATION*/
    var workLocation = {
        animationEnabled: true,
	title: {
		text: "Top 10 Preferred Work Location of Applicants",                
		fontColor: "Peru"
	},	
	axisY: {
		tickThickness: 0,
		lineThickness: 0,
		valueFormatString: " ",
		includeZero: true,
		gridThickness: 0                    
	},
	axisX: {
		tickThickness: 0,
		lineThickness: 0,
		labelFontSize: 18,
		labelFontColor: "Peru"				
	},
	data: [{
		indexLabelFontSize: 16,
		toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
		indexLabelPlacement: "inside",
		indexLabelFontColor: "black",
		indexLabelFontWeight: 600,
		indexLabelFontFamily: "Verdana",
		color: "#62C9C3",
		type: "bar",
		dataPoints: []
	}]
    }
    
    let location_data_points = workLocation.data[0].dataPoints;
    try{
        const locations = await $.ajax({
            url: "/get_top_five_location",
            type: "GET"
        })
        let locationArr = locations.location;
        let totalLocation = 0;
        for(let j = 0; j < locationArr.length; j++){
            totalLocation += parseInt(locationArr[j].count);
        }
        for(let i = 0; i < locationArr.length; i++){
            // {work_occupation: 'MANILA', count: 3}
            let location = locationArr[i].work_occupation;
            let locationYValue = Math.round(parseInt(locationArr[i].count)/totalLocation * 100);

            location_data_points.push({ label: locationYValue + "%", y: locationYValue, indexLabel: location })
        }
    } catch (error) {
        console.error(error);
    }
    $("#location").CanvasJSChart(workLocation);
    
    /*TOP COMPANY*/
    var topCompany = {
        animationEnabled: true,
        title: {
            text: `Top 10 Company Work Experience of Applicants`
        },
        axisY: {
            title: "Percentage",
            suffix: "%"
        },
        axisX: {
            title: "Companies"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };
    let topCompanyDataPoints = topCompany.data[0].dataPoints;
    try{
        const topCompany = await $.ajax({
            url: "/get_top_company",
            type: "GET"
        })
        let companyArr = topCompany.company;
        console.log(companyArr)
        let totalCompany = 0;
        for(let j = 0; j < companyArr.length; j++){
            totalCompany += parseInt(companyArr[j].count);
        }
        console.log(totalCompany);
        for(let i = 0; i < companyArr.length; i++){
            // {company_name: '"Toei Animation"', count: 1}
            let company = companyArr[i].company_name;
            let companyYValue = Math.round(parseInt(companyArr[i].count)/totalCompany * 100);

            topCompanyDataPoints.push({ label: company.toUpperCase(), y: companyYValue })
        }
    } catch (error) {
        console.error(error);
    }

    $("#topCompany").CanvasJSChart(topCompany); /* Add data to the graph */

    /*TOP 10 POSITION*/
    var topPosition = {
        animationEnabled: true,
	title: {
		text: "Top 10 Job Experienced of Applicants",            
		fontColor: "Peru"
	},	
	axisY: {
		tickThickness: 0,
		lineThickness: 0,
		valueFormatString: " ",
		includeZero: true,
		gridThickness: 0                    
	},
	axisX: {
		tickThickness: 0,
		lineThickness: 0,
		labelFontSize: 18,
		labelFontColor: "Peru"				
	},
	data: [{
		indexLabelFontSize: 16,
		toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
		indexLabelPlacement: "inside",
		indexLabelFontColor: "orange",
		indexLabelFontWeight: 600,
		indexLabelFontFamily: "Verdana",
		color: "#32393d",
		type: "bar",
		dataPoints: []
	}]
    }
    
    let positionDataPoints = topPosition.data[0].dataPoints;
    try{
        const position = await $.ajax({
            url: "/get_top_position",
            type: "GET"
        })
        let positionArr = position.position;
        let totalPosition = 0;
        for(let j = 0; j < positionArr.length; j++){
            totalPosition += parseInt(positionArr[j].count);
        }
        for(let i = 0; i < positionArr.length; i++){
            let position = positionArr[i].position;
            let positionYValue = Math.round((parseInt(positionArr[i].count)/totalPosition) * 100); // Round to nearest integer
            positionDataPoints.push({ y: positionYValue, label: `${positionYValue}%`, indexLabel: position.toUpperCase() });
        }

    } catch (error) {
        console.error(error);
    }
    $("#topPosition").CanvasJSChart(topPosition);
    
    /*AGE*/
    let age = {
        title: {
            text: "List of Applicants Age"
        },
        subtitles: [{
            text: ""
        }],
        theme: "light1",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: []
        }]
    };
    let age_data_points = age.data[0].dataPoints;
    try{
        const birthyear = await $.ajax({
            url: "/get_top_age",
            type: "GET"
        })
        let yearArr = birthyear.birthdate;
        // console.log(yearArr.length);
        let totalAge = 0;
        for(let j = 0; j < yearArr.length; j++){
            // let age = 2024 - yearArr[j].year;
            // let count = yearArr[j].count;
            totalAge += parseInt(yearArr[j].count);
        }
        console.log(totalAge)
        for(let i = 0; i < yearArr.length; i++){
            let age = 2024 - yearArr[i].year;
            // let countYValue = Math.round((parseInt(yearArr[i].count)/totalAge) * 100); // Round to nearest integer
            age_data_points.push({label: `${age} years old`, y: yearArr[i].count });
        }

    } catch (error) {
        console.error(error);
    }
    $("#ageGraph").CanvasJSChart(age); /* Add data to the graph */

    // TOTAL APPLICANT LINE GRAPH
    var totalApplicantsGraph = {
        animationEnabled: true,
        title: {
            text: `Total Applicants this ${monthName}`
        },
        axisX: {
            title: "Date",
            valueFormatString: "MMM DD"
        },
        axisY: {
            title: "No. of applicant",
            // prefix: ""
        },
        data: [{
            type: "spline",
            // yValueFormatString: "$#,###",
            dataPoints: []
        }]
    };

    let total_applicants_data_points = totalApplicantsGraph.data[0].dataPoints;
    try{
        const totalApplicants = await $.ajax({
            url: "/get_total_applicant_per_month",
            type: "GET"
        })
        for(let i = 0; i < totalApplicants.length; i++){
            const year = parseInt(totalApplicants[i].year);
            const month = parseInt(totalApplicants[i].month) - 1; // minus 1
            const day = parseInt(totalApplicants[i].day);
            const applicantTotal = parseInt(totalApplicants[i].total_applicants);
            total_applicants_data_points.push({ x: new Date(year, month, day), y: applicantTotal });
            console.log("n")
        }
        // { x: new Date(2017, 10), y: 52160 },
        // console.log(total_applicants_data_points)
        $("#lineGraphTotalApplicant").CanvasJSChart(totalApplicantsGraph);
    }
    catch(error){
        console.error(error);
    }
    
    // TOP LANGUAGE

    let topLanguageGraph = {
        title: {
            text: "Most Proficient Language Used By Applicants"
        },
        subtitles: [{
            text: ``
        }],
        theme: "light1",
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                
            ]
        }]
    };
    let languageDataPoints = topLanguageGraph.data[0].dataPoints;
    try{
        const topLanguage = await $.ajax({
            url: "/get_top_language",
            type: "GET"
        })
        for(let i = 0; i < topLanguage.length; i++){
            languageDataPoints.push({ y: parseInt(topLanguage[i].count), label: topLanguage[i].language.toUpperCase() });
        }
    }
    catch(error){
        console.error(error);
    }
    $("#languageGraph").CanvasJSChart(topLanguageGraph);

    // TOP SKILLS
    var skillGraph = {
        animationEnabled: true,
        title: {
            text: `Most Other Skills Acquired with Formal Training of Applicants`
        },
        axisY: {
            title: "Percentage",
            suffix: "%"
        },
        axisX: {
            title: ""
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };
    let skillDataPoints = skillGraph.data[0].dataPoints;
    try{
        const topSkill = await $.ajax({
            url: "/get_top_skill",
            type: "GET"
        })
        let totalSkill = 0;
        for(let j = 0; j < topSkill.length; j++){
            totalSkill += parseInt(topSkill[j].skill_count);
        }
        // console.log(totalSkill);
        for(let i = 0; i < topSkill.length; i++){
            let skill = topSkill[i].skill;
            console.log(skill)
            let skillYValue = Math.round(parseInt(topSkill[i].skill_count)/totalSkill * 100);

            skillDataPoints.push({ label: skill.toUpperCase(), y: skillYValue })
        }
        $("#skillGraph").CanvasJSChart(skillGraph);
    }
    catch(error){
        console.error(error);
    }
};
