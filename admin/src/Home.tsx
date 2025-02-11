import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getAccounts, getProjects, getTransactions } from './api/apiEndpoints';
import { ColumnDef } from '@tanstack/react-table';
import NexGenTable from './components/NexGenTable/NexGenTable';

interface CurrencyData {
    currency: string;
    value: number;
}

interface Project {
  projectName: string;
  investmentAmount: number;
  currencyData?: CurrencyData[];
  transactions?:any[]
}

interface TransactionType {
  credit: number;
  debit: number;
}


const Home = () => {
    const [data, setData] = useState<Project[]>([]);
    const COLORS = ['#0088FE', '#FFBB28', '#FF8042']; // Define colors for the pie segments
    const [selectedProject, setSelectedProject] = useState<Project>();

    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [currencyTotals, setCurrencyTotals] = useState<TransactionType[]>([]);

    useEffect(() => {
      const fetchInvestments = async () => {
        try {
          const transactions = await getTransactions(); // Fetch the investor data
          const projects = await getProjects();
          const accounts = await getAccounts();

          const investments = projects.map((project: any) => {
            const projectTransactions = transactions.filter(
              (transaction: any) => transaction.projectId === project.id
            );

            const totalInvestmentAmount = projectTransactions.reduce(
              (acc: number, transaction: any) => {
                if (transaction.credited) {
                  return acc + Number(transaction.amount); // Add amount if credited
                } else {
                  return acc - Number(transaction.amount); // Subtract amount if debited
                }
              }, 0
            );


            const currencyData = projectTransactions.reduce((acc: any, tx: any) => {
              const account = accounts.find((ac: any) => ac.id === tx.accountId);
              const currencyName = account ? account.currency : tx.currency; // Use account name if found, otherwise use tx.currency


              const currencyItem = acc.find((item: any) => item.currency === currencyName);
              
              const amount = tx.credited ? tx.amount : -tx.amount;


              if (currencyItem) {
                currencyItem.value += amount;
              } else {
                acc.push({ currency: currencyName, value: tx.amount });
              }
              return acc;
            }, [] as { currency: string; value: number }[]);

            // Adding all transactions (both credited and debited) for this project
            const allTransactions = projectTransactions.map((transaction: any) => {
              const account = accounts.find((ac: any) => ac.id === transaction.accountId);
              const currencyName = account ? account.currency : transaction.currency; // Use account name if found, otherwise use tx.currency

              return {
                id: transaction.id,
                amount: transaction.amount,
                credited: transaction.credited,
                date: transaction.date,
                accountId: transaction.accountId,
                currencyName:currencyName
              }
            });

            return {
              projectName: project.name,
              investmentAmount: totalInvestmentAmount,
              currencyData,
              transactions:allTransactions
            };
          })
          setData(Object.values(investments));
        } catch (err) {
          // setError('Failed to fetch investments');
        } finally {
          // setLoading(false);
        }
      };

      fetchInvestments();
    }, []);

    // Handle click on project pie slice
    const handleProjectClick = (data:any) => {
      setSelectedProject(data);
    };

    const handleCurrencyClick = (currencyData: any) => {
      const currency = currencyData.payload.currency;
      setSelectedCurrency(currency);
      if (selectedProject !== undefined) {
        // Calculate credit and debit totals for the selected currency
        const transactions = selectedProject.transactions && selectedProject.transactions.filter(
          (item: any) => item.currencyName === currency
        );
        
        
        const creditTotal = transactions && transactions.reduce(
          (acc: number, item: any) => (item.credited ? acc + item.amount : acc),
          0
        );
        
        const debitTotal = transactions && transactions.reduce(
          (acc: number, item: any) => (!item.credited ? acc - item.amount : acc),
          0
        );

        setCurrencyTotals([{
          credit: Number(creditTotal),
          debit: Number(debitTotal)
        }]);
      }
    };

    const formatAmount = (num:any) => {
      if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
      if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
      if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
      if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
      return num.toString(); // Less than 1,000
    };

    
    const projectInvestmentsColumns: ColumnDef<Project>[] = [
      {
        header: 'Project Investments Details',
        columns: [
          {
            accessorKey: 'projectName',
            header: 'Name',
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'investmentAmount',
            header: 'Value',
            cell: info => formatAmount(info.getValue()),
          }
        ],
      },
    ];

    const projectCurrencyColumns: ColumnDef<CurrencyData>[] = [
      {
        header: 'Project Investments Details',
        columns: [
          {
            accessorKey: 'currency',
            header: 'Name',
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'value',
            header: 'Value',
            cell: info => formatAmount(info.getValue()),
          }
        ],
      },
    ];

    const transactionTypeColumns: ColumnDef<TransactionType>[] = [
      {
        header: 'Project Investments Details',
        columns: [
          {
            accessorKey: 'credit',
            header: 'Transactions Credit Total',
            cell: info => formatAmount(info.getValue()),
          },
          {
            accessorKey: 'debit',
            header: 'Transactions Debit Total',
            cell: info => formatAmount(info.getValue()),
          }
        ],
      },
    ];

    return (
        <div style={{height: 'calc(150vh - 52px)'}} className="w-100 d-flex align-items-center">
          <div className='d-flex justify-content-between'>
            <div className="d-flex flex-column  align-items-center">
              <h2>Investor Investments by Projects</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="investmentAmount"
                  onClick={handleProjectClick}
                // label // Label in percentage
                // label={({ projectName, investmentAmount }) => `${projectName}: ${investmentAmount}`} // Label in percentage
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                {/* <Tooltip /> */}
                <Tooltip
                  formatter={(value, _, entry) => {
                    // Ensure to access the currency correctly
                    const name = entry.payload.projectName; // Access currency from payload
                    return [`${name}: ${formatAmount(value)}`]; // Return formatted value as an array
                  }}
                />
                {/* <Tooltip formatter={(investmentAmount, projectName) => `${projectName}:- ${investmentAmount}`} /> */}
              </PieChart>
              <NexGenTable columns={projectInvestmentsColumns} data={data} />
            </div>
            {selectedProject && (
              <div className=" d-flex flex-column  align-items-center ">
                <h4>{selectedProject.projectName} Currency-based Investments</h4>
                <PieChart width={400} height={400}>
                  <Pie
                    data={selectedProject.currencyData}
                    cx={200}
                    cy={200}
                    outerRadius={150}
                    fill="#82ca9d"
                    dataKey="value"
                    onClick={handleCurrencyClick} // Add onClick handler here
                  >
                    {selectedProject.currencyData && selectedProject.currencyData.map((_: any, index: any) => (
                      <Cell key={`cell-currency-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, _, entry) => {
                      // Ensure to access the currency correctly
                      const name = entry.payload.currency; // Access currency from payload
                      return [`${name}: ${formatAmount(value)}`]; // Return formatted value as an array
                    }}
                  />
                </PieChart>
                <NexGenTable columns={projectCurrencyColumns} data={selectedProject.currencyData || []} />
              </div>
            )}
          {selectedCurrency && currencyTotals && (
            <div className=" d-flex flex-column align-items-center">
              <h4>{selectedCurrency} Credit and Debit Totals</h4>
              <PieChart width={400} height={400}>
                <Pie
                  data={[
                    { name: 'Credit', value: currencyTotals[0].credit },
                    { name: 'Debit', value: currencyTotals[0].debit },
                  ]}
                  cx={200}
                  cy={200}
                  outerRadius={150}
                  fill="#82ca9d"
                  dataKey="value"
                >
                  <Cell key="credit" fill="#4CAF50" />
                  <Cell key="debit" fill="#F44336" />
                </Pie>
                <Tooltip
                  formatter={(value, _, entry) => {
                    const name = entry.payload.name; // Access name (Credit/Debit)
                    return [`${name}: ${formatAmount(value)}`];
                  }}
                />
              </PieChart>
              <NexGenTable columns={transactionTypeColumns} data={currencyTotals || []} />
            </div>
          )}

          </div>
        </div>
    )
}

export default Home;