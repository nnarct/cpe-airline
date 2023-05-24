export const Kong = () => {
  return (
    <div>
      <section className="flex items-center p-0">
        <div className="h-full text-center container mx-auto px-4 my-5">
          <div className="justify-center flex flex-wrap">
            <div className="px-12 px-4 w-full lg:w-6/12 w-full md:w-8/12">
              <h1 className="text-4xl font-bold leading-tight">Invoice</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap ">
            <div className="mx-auto px-4 w-full lg:w-10/12">
              <div className="bg-white rounded-lg flex flex-col break-words w-full mb-6 shadow-lg">
                <div className="px-5 pt-6 pb-4 border-b border-blueGray-200">
                  <div className="justify-between flex flex-wrap">
                    <div className="text-left px-4 w-full md:w-4/12">
                      <div className="text-left">
                        <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">
                          Flight : TG223
                        </h3>
                        <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">
                          From:
                        </h3>
                        <h6 className="block capitalize text-blueGray-700 mt-2 mb-0">
                          สนามบินนานาชาติเชียงใหม่ (CNX)
                        </h6>
                        <h6 className="text-blueGray-700">
                          6.35 น. : 31/05/2023
                        </h6>
                      </div>
                    </div>
                    <div className="text-left px-4 w-full lg:w-3/12 w-full md:w-5/12">
                      <div className="flex justify-center py-6 lg:pt-6 pt-12">
                        <div className="text-left">
                          <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">
                            To:
                          </h3>
                          <h6 className="block mt-2 mb-0 text-xl">
                            สนามบินสุวรรณภูมิ (BKK)
                          </h6>
                          <p className="text-blueGray-500">
                            07.55 น. : 31/05/2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:justify-between flex flex-wrap">
                    <div className="text-left px-4 w-full md:w-4/12">
                      <h4 className="text-2xl font-semibold leading-normal mb-2 mt-12 text-left">
                        Invoice no
                      </h4>
                      <h3 className="text-2xl font-normal leading-normal mt-1 mb-2 font-light">
                        #0453119
                      </h3>
                    </div>
                    <div className="text-left px-4 w-full lg:w-3/12 w-full md:w-5/12">
                      <div className="flex justify-center py-6 lg:pt-4">
                        <div className="mt-12">
                          <p className="float-left mb-0">Invoice date:</p>
                          <p className="ml-4 float-right mb-0">20/05/2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 flex-auto">
                  <table className="text-right w-full mb-4 text-blueGray-800 border-collapse">
                    <thead className="bg-blueGray-800">
                      <tr className="text-right uppercase font-light">
                        <th className="p-3 border-t" scope="col">
                          รายละเอียด
                        </th>
                        <th className="p-3 border-t" scope="col">
                          จำนวน
                        </th>
                        <th className="p-3 border-t" scope="col">
                          ราคา/คน
                        </th>
                        <th className="p-3 border-t" scope="col">
                          ราคาสุทธิ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4 p-3 border-t">ที่นั่งสักอย่าง 1</td>
                        <td className="py-4 p-3 border-t">2</td>
                        <td className="py-4 p-3 border-t">฿2,264.34</td>
                        <td className="py-4 p-3 border-t">฿4,528.68</td>
                      </tr>
                      <tr>
                        <td className="py-4 p-3 border-t">ที่นั่งสักอย่าง 2</td>
                        <td className="py-4 p-3 border-t">1</td>
                        <td className="py-4 p-3 border-t">$3,134.24</td>
                        <td className="py-4 p-3 border-t">$3,134.24</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="mt-4">
                        <th className="border-b-0 p-3 border-t">
                          <p className="text-lg font-semibold pt-2">
                            ยอดรวมราคาสุทธิ
                          </p>
                        </th>
                        <th className="border-b-0 p-3 border-t" colSpan="3">
                          <p className="text-right text-lg font-semibold pt-2">
                            ฿5,398.58
                          </p>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-blueGray-200">
                  <div className="text-right ml-auto px-4 w-full md:w-5/12">
                    <h5 className="text-2xl font-semibold leading-normal mt-0 mb-2">
                      Thank you!
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
