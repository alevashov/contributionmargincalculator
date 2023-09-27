function createStackedBarChart(contribution_margin, COGS, average_order_value, total_variable_costs) {
    // Get context for the canvas
    var ctx = document.getElementById('contributionMarginChart').getContext('2d');
    
    // Adjust values so that they stack up to Average Order Value
    var adjusted_total_variable_costs = average_order_value - contribution_margin - COGS;
    
    // Create a new Chart instance
    var chart = new Chart(ctx, {
        // Type of chart to create
        type: 'bar',
        
        // Data for the chart
        data: {
            // Labels for the x-axis
            labels: ['Your order structure'],
            
            // Datasets for each segment
            datasets: [
                {
                    // Label for Contribution Margin
                    label: 'Contribution Margin',
                    data: [contribution_margin],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                },
                {
                    // Label for COGS
                    label: 'COGS',
                    data: [COGS],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                },
                {
                    // Label for Adjusted Total Variable Costs
                    label: 'Adjusted Total Variable Costs',
                    data: [adjusted_total_variable_costs],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)'
                },                
            ]
        },
        
        // Chart options
        options: {
            // Configuration for scales
            scales: {
                // X-axis scale
                x: {
                    // Enable stacking
                    stacked: true,
                },
                // Y-axis scale
                y: {
                    // Enable stacking
                    stacked: true,
                    // Set min and max to ensure chart height is 100%
                    min: 0,
                    max: average_order_value
                }
            }
        }
    });
}

function calculateCM() {
    // Get form values
    var average_order_value = parseFloat(document.getElementById('average_order_value').value);
    var COGS = parseFloat(document.getElementById('COGS').value);
    var shipping_costs = parseFloat(document.getElementById('shipping_costs').value);
    var package_materials = parseFloat(document.getElementById('package_materials').value);
    var picking_handling = parseFloat(document.getElementById('picking_handling').value);
    var payment_fees_percent = parseFloat(document.getElementById('payment_fees_percent').value);
    var payment_fees_per_order = parseFloat(document.getElementById('payment_fees_per_order').value);
    var ecommerce_platform_fee_percent = parseFloat(document.getElementById('ecommerce_platform_fee_percent').value);
    var ecommerce_platform_fee_per_order = parseFloat(document.getElementById('ecommerce_platform_fee_per_order').value);
    var returns_percent = parseFloat(document.getElementById('returns_percent').value);
    var promotions_percent = parseFloat(document.getElementById('promotions_percent').value);
    var advertising_percent = parseFloat(document.getElementById('advertising_percent').value);
    var other_costs = parseFloat(document.getElementById('other_costs').value);

    // Calculate total payment fees
    var payment_fees_total = (payment_fees_percent * average_order_value / 100) + payment_fees_per_order;
    
    // Calculate total eCommerce platform fees
    var ecommerce_platform_fee_total = (ecommerce_platform_fee_percent * average_order_value / 100) + ecommerce_platform_fee_per_order;
    
    // Calculate returns cost
    var returns_cost = returns_percent * average_order_value / 100;
    
    // Calculate promotions cost
    var promotions_cost = promotions_percent * average_order_value / 100;
    
    // Calculate advertising cost
    var advertising_cost = advertising_percent * average_order_value / 100;
    
    // Calculate total variable costs
    var total_variable_costs = COGS + shipping_costs + package_materials + picking_handling + payment_fees_total + ecommerce_platform_fee_total + returns_cost + promotions_cost + advertising_cost + other_costs;

    // Calculate Contribution Margin
    var contribution_margin = average_order_value - total_variable_costs;
    
    // Calculate Contribution Margin Ratio
    var contribution_margin_ratio = (contribution_margin / average_order_value) * 100;

  // Display Interim Results
    document.getElementById('total_payment_cost').innerText = payment_fees_total.toFixed(2);
    document.getElementById('total_ecommerce_platform_cost').innerText = ecommerce_platform_fee_total.toFixed(2);
    document.getElementById('total_variable_costs').innerText = total_variable_costs.toFixed(2);

    // Display Final Results
    document.getElementById('contribution_margin').innerText = contribution_margin.toFixed(2);
    document.getElementById('contribution_margin_ratio').innerText = contribution_margin_ratio.toFixed(2);
	// Create the stacked bar chart
    createStackedBarChart(contribution_margin, COGS, average_order_value, total_variable_costs);
}

