import { banks } from "../../../../loan/bankData";
import LoanApplicationForm from "../../../../loan/LoanApplicationForm";

const LoanApplicationPage = ({ params }) => {
  const bank = banks.find(b => b.id === Number(params.bankId));
  const loan = bank.products.find(p => p.id === Number(params.loanId));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <img src={bank.logo} alt={bank.name} className="w-16 h-16 object-contain mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{loan.name}</h1>
              <p className="text-gray-600">{bank.name}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-green-800 mb-2">Loan Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Amount:</span> {loan.amount}</p>
                <p><span className="font-medium">Interest Rate:</span> {loan.interest}</p>
                <p><span className="font-medium">Tenure:</span> {loan.tenure}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Required Documents</h3>
              <ul className="list-disc list-inside text-sm">
                {loan.documents.map((doc) => (
                  <li key={doc} className="text-gray-600">{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <LoanApplicationForm 
          bankId={bank.id} 
          loanId={loan.id} 
          loanDetails={loan} 
        />
      </div>
    </div>
  );
};

export default LoanApplicationPage; 