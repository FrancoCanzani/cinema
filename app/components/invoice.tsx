'use client';

import { useState } from 'react';

export default function Invoice() {
  const [tickets, setTickets] = useState(1);
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className='w-full lg:w-3/4 bg-white shadow-md rounded-md overflow-hidden'>
      <div className='flex justify-between items-center px-6 py-4'>
        <div className='flex items-center'>
          <h1 className='ml-3 text-xl font-semibold'>Lumière Cinema</h1>
        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-500'>Invoice #INV-2024-001</p>
          <p className='text-sm text-gray-500'>Date: {formattedDate}</p>
        </div>
      </div>
      <div className='px-6 py-4'>
        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Item
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Quantity
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Unit Price
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        Movie Ticket
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='number'
                          min='1'
                          max='15'
                          value={tickets}
                          className='bg-gray-50 text-center rounded-sm'
                          onChange={(e) => setTickets(Number(e.target.value))}
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>$10.00</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {USDollar.format(tickets * 10)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <div className='w-full sm:w-2/3 lg:w-1/2'>
            <div className='flex justify-between py-6'>
              <span className='text-gray-600 dark:text-gray-400'>
                Tax (10%)
              </span>
              <span className='text-gray-600 dark:text-gray-400'>
                {USDollar.format(tickets * 10 * 0.1)}
              </span>
            </div>
            <div className='flex justify-between border-t border-b border-gray-200 py-6 font-semibold'>
              <span className='text-gray-600 dark:text-gray-400'>Total</span>
              <span className='text-gray-600 dark:text-gray-400'>
                {USDollar.format(tickets * 10 + tickets * 10 * 0.1)}
              </span>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center mt-6'>
          <div>
            <span className='text-gray-600 dark:text-gray-400'>
              Payment due: {formattedDate}
            </span>
          </div>
          <button className='px-6 py-2 bg-black hover:text-gray-200 text-white rounded-sm'>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
