const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayInvoices(invoices) {
  let tab = ``;

  invoices.forEach((invoice) => {
    let rest_paid = Math.round(invoice.total_amount - invoice.amount_paid, 2);
    let status = `<div class="actions"><a href="#" class="btn btn-sm bg-danger-light mr-2"> Not Paid </a></div>`;
    if (rest_paid <= 0) {
      rest_paid = 0;
      status = `<div class="actions"><a href="#" class="btn btn-sm bg-success-light mr-2"> Paid </a></div>`;
    }
    tbody.append(`
        <tr>
            <td>
                ${invoice.id}
            </td>
            <td>${invoice.name} ${invoice.last_name}</td>
            <td>${invoice.debut_reservation.split("").slice(0, 10).join("")}</td>
            <td>${invoice.fin_reservation.split("").slice(0, 10).join("")}</td>
            <td>$${invoice.total_amount}</td>
            <td>$${invoice.amount_paid}</td>
            <td>$${rest_paid}</td>
            <td class="text-right">
                ${status}
            </td>
            <td class="text-right">
                <div class="dropdown dropdown-action">
                    <a href="#" class="action-icon dropdown-toggle"
                        data-toggle="dropdown" aria-expanded="false"><i
                            class="fas fa-ellipsis-v ellipse_color"></i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#view_${invoice.id}">
                            <i class="fas fa-eye m-r-5"></i> View
                        </a>
                    </div>
                </div>

                <div id="view_${invoice.id}" class="modal fade delete-modal" role="dialog">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-body">

                                <!-- Modal header -->
                                <div class="page-header">
                                    <div class="row align-items-center">
                                        <div class="col-sm-5 col-4">
                                            <div class="mt-5">
                                                <h4 class="card-title float-left mt-2">Invoice</h4>
                                            </div>
                                        </div>
                                        <div class="col-sm-7 col-8 text-right">
                                            <div class="mt-5">
                                                <div class="btn-group btn-group-sm">
                                                    <button class="btn btn-white">CSV</button>
                                                    <button class="btn btn-white">PDF</button>
                                                    <button class="btn btn-white">
                                                        <i class="fas fa-print fa-lg"></i> Print
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Modal content -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row custom-invoice">
                                                    <div class="col-6 col-sm-6 m-b-20 text-left">
                                                        <img src="../assets/img/logo-dark.png" class="inv-logo" alt="" />
                                                        <ul class="list-unstyled">
                                                            <li>${invoice.address},</li>
                                                            <li>Madagascar, CA</li>
                                                            <li>GST No:</li>
                                                        </ul>
                                                    </div>
                                                    <div class="col-6 col-sm-6 m-b-20">
                                                        <div class="invoice-details">
                                                            <h3 class="text-uppercase">Invoice #INV-00${invoice.id}</h3>
                                                            <ul class="list-unstyled">
                                                                <li>Date: <span>${new Date(invoice.debut_reservation).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></li>
                                                                <li>Due date: <span>${new Date(invoice.payment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6 col-lg-6 m-b-20 text-left">
                                                        <h5>Invoice to:</h5>
                                                        <ul class="list-unstyled">
                                                            <li>
                                                                <h5><strong>${invoice.name} ${invoice.last_name}</strong></h5>
                                                            </li>
                                                            <li><span>Global Technologies</span></li>
                                                            <li>5754 Airport Rd</li>
                                                            <li>Coosada, AL, 36020</li>
                                                            <li>United States</li>
                                                            <li>888-777-6655</li>
                                                            <li>
                                                                <a href="#"><span class="__cf_email__" data-cfemail="22404350505b4157464362475a434f524e470c414d4f">[email&#160;protected]</span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="col-sm-6 col-lg-6 m-b-20 text-left">
                                                        <div class="invoices-view">
                                                            <span class="text-muted">Payment Details:</span>
                                                            <ul class="list-unstyled invoice-payment-details">
                                                                <li>
                                                                    <h5>Total Due: <span class="text-right">$${invoice.total_amount}</span></h5>
                                                                </li>
                                                                <li>Bank name: <span>Profit Bank Europe</span></li>
                                                                <li>Country: <span>United Kingdom</span></li>
                                                                <li>City: <span>London E1 8BF</span></li>
                                                                <li>Address: <span>3 Goodman Street</span></li>
                                                                <li>IBAN: <span>KFH37784028476740</span></li>
                                                                <li>SWIFT code: <span>BPT4E</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </td>
        </tr>
        `);
  });

  $(document).ready(function () {
    $("#myTable").DataTable();
  });
}

fetch(`${URL}/displayInvoicesTotalAmountPayed`)
  .then((res) => res.json())
  .then((data) => displayInvoices(data));
