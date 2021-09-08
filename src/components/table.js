const Table = (props) => {
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
            {props.data?.map((item, i) => {
              if (
                props.language === "Choose Language" ||
                item.languages.filter((lang) => lang.name === props.language)
                  .length > 0
              ) {
                return (
                  <tr key={i}>
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
    </div>
  );
};

export default Table;
