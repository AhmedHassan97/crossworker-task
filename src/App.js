import "./App.css";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const App = () => {
  const [region, setRegion] = useState("Choose Region");
  const [language, setLanguage] = useState("Choose Language");
  const [languages, setLanguages] = useState([]);
  const [data, setData] = useState([]);

  const getByRegion = async (region) => {
    setRegion(region);
    setLanguage("Choose Language");
    const results = await axios.get(
      `https://restcountries.eu/rest/v2/region/${region.toLowerCase()}`
    );
    setData(results.data);
    const languageSet = new Set();

    results.data.map((item) =>
      item.languages.map((language) => languageSet.add(language.name))
    );
    setLanguages(Array.from(languageSet));
    console.log(languageSet);
  };
  return (
    <div className="flex flex-col-reverse">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Country Name</th>
              <th>Population Density</th>
              <th>Languages</th>
              <th>currency</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              if (
                language === "Choose Language" ||
                item.languages.filter((lang) => lang.name === language).length >
                  0
              ) {
                return (
                  <tr>
                    <td>
                      <img
                        src={item.flag}
                        width="30"
                        height="30"
                        alt="country-flag"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.area && item.population
                        ? Math.round(
                            parseInt(item.population) / parseInt(item.area)
                          )
                        : "-"}
                    </td>
                    <td>
                      {item.languages.map((language, i) => {
                        if (i + 1 === item.languages.length) {
                          return `${language.name} `;
                        } else {
                          return `${language.name}, `;
                        }
                      })}
                    </td>
                    <td>
                      {item.currencies.map((currency, i) => {
                        if (i + 1 === item.currencies.length) {
                          return `${currency.name} `;
                        } else {
                          return `${currency.name}, `;
                        }
                      })}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="ml-auto m-4">
        <Menu as="div" className="relative inline-block text-left p-2">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {region}{" "}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item onClick={() => getByRegion("Africa")}>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Africa{" "}
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item onClick={() => getByRegion("Americas")}>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Americas
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item onClick={() => getByRegion("Asia")}>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Asia
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item onClick={() => getByRegion("Europe")}>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Europe
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* ///////////////////////////////////////////////////Language///////////////////////////////////////////////////// */}
        {region !== "Choose Region" ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {language}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {languages.map((lang) => (
                    <Menu.Item onClick={() => setLanguage(lang)}>
                      {({ active }) => (
                        <a
                          href="/#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {lang}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default App;
