const targetDiv = document.getElementById("glass");
      const btn = document.getElementById("open");
      btn.onclick = function () {
          targetDiv.style.display = "flex";
      };

      const btn1 = document.getElementById("close");
      btn1.onclick = function () {
          targetDiv.style.display = "none";
      };
      

  //   Graph 1
  Number.prototype.comma_formatter = function() {
      return this.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  
  let chartData = function(){
      return {
          date: 'today',
          options: [
              {
                  label: 'Today',
                  value: 'today',
              },
              {
                  label: 'Last 7 Days',
                  value: '7days',
              },
              {
                  label: 'Last 30 Days',
                  value: '30days',
              },
              {
                  label: 'Last 6 Months',
                  value: '6months',
              },
              {
                  label: 'This Year',
                  value: 'year',
              },
          ],
          showDropdown: false,
          selectedOption: 0,
          selectOption: function(index){
              this.selectedOption = index;
              this.date = this.options[index].value;
              this.renderChart();
          },
          data: null,
          fetch: function(){
              fetch('https://cdn.jsdelivr.net/gh/swindon/fake-api@master/tailwindAlpineJsChartJsEx1.json')
                  .then(res => res.json())
                  .then(res => {
                      this.data = res.dates;
                      this.renderChart();
                  })
          },
          renderChart: function(){
              let c = false;
  
              Chart.helpers.each(Chart.instances, function(instance) {
                  if (instance.chart.canvas.id == 'chart') {
                      c = instance;
                  }
              });
  
              if(c) {
                  c.destroy();
              }
  
              let ctx = document.getElementById('chart').getContext('2d');
  
              let chart = new Chart(ctx, {
                  type: "line",
                  data: {
                      labels: this.data[this.date].data.labels,
                      datasets: [
                          {
                              label: "Approved",
                              backgroundColor: "rgba(102, 126, 234, 0.25)",
                              borderColor: "rgba(102, 126, 234, 1)",
                              pointBackgroundColor: "rgba(102, 126, 234, 1)",
                              data: this.data[this.date].data.income,
                          },
                          {
                              label: "Rejected",
                              backgroundColor: "rgba(237, 100, 166, 0.25)",
                              borderColor: "rgba(237, 100, 166, 1)",
                              pointBackgroundColor: "rgba(237, 100, 166, 1)",
                              data: this.data[this.date].data.expenses,
                          },
                      ],
                  },
                  layout: {
                      padding: {
                          right: 10
                      }
                  },
                  options: {
                      scales: {
                          yAxes: [{
                              gridLines: {
                                  display: false
                              },
                              ticks: {
                                  callback: function(value,index,array) {
                                      return value > 1000 ? ((value < 1000000) ? value/1000 + 'K' : value/1000000 + 'M') : value;
                                  }
                              }
                          }]
                      }
                  }
              });
          }
      }
  }