import React, { useEffect, useState } from "react";
import { Button, FormCheck, FormControl, InputGroup, Modal, Spinner } from "react-bootstrap";
import ContactsList from "./problem2/ContactsList";

const Problem2 = () => {
  // --------States--------
  const [isUsOnly, setUsOnly] = useState(false);
  const [show, setShow] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setNextPage] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);

  //----------Modal show close----------
  const handleClose = () => {
    setSearchValue("");
    setShow(false);
    setOnlyEven(false);
  };
  const handleAllShow = () => {
    setPage(1);
    setUsOnly(false);
    setShow(true);
    setOnlyEven(false);
    setSearchValue("");
  };
  const handleUsOnlyShow = () => {
    setPage(1);
    setUsOnly(true);
    setShow(true);
    setOnlyEven(false);
    setSearchValue("");
  };

  // ---------Fetch Numbers--------
  useEffect(() => {
    const url = isUsOnly ? `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${page}&search=${searchValue}` : `https://contact.mediusware.com/api/contacts/?page=${page}&search=${searchValue}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        page === 1 ? setNumbers(data?.results) : setNumbers((prev) => [...prev, ...data?.results]);
        setLoading(false);
        setError(false);
        data.next == null ? setNextPage(false) : setNextPage(true);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [searchValue, page, isUsOnly]);

  // ---------HandleModalScroll--------
  const handleScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight !== e.target.scrollHeight || isloading) {
      return;
    } else {
      if (hasNextPage) {
        setPage((prev) => prev + 1);
      }
    }
  };

  // -----------Filter by Even:-------------
  const filteredNumbers = onlyEven ? numbers.filter((number) => parseInt(number.id % 2) === 0) : numbers;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-primary"
            type="button"
            onClick={handleAllShow}
            style={{
              backgroundColor: "#46139f",
              borderColor: "#46139f"
            }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-warning"
            type="button"
            onClick={handleUsOnlyShow}
            style={{
              backgroundColor: "#ff7f50",
              borderColor: "#ff7f50"
            }}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Contacts Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable={true}>
        <Modal.Header>
          <div className=" container w-100 d-flex justify-content-between align-items-center">
            <Modal.Title>{isUsOnly ? "US Contacts" : "All Contacts"}</Modal.Title>
            <FormCheck type="checkbox" label="Only Even Numbers" id="onlyEvenCheckbox" checked={onlyEven} onChange={() => setOnlyEven(!onlyEven)} />
          </div>
        </Modal.Header>
        <Modal.Body onScroll={handleScroll} style={{ overflowY: "scroll" }}>
          <InputGroup className="mb-3 w-50 mx-auto">
            <FormControl
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => {
                setPage((prev) => prev - prev + 1);
                setSearchValue(e.target.value);
              }}
            />
          </InputGroup>
          <ul>
            {isloading && <Spinner></Spinner>}
            {isError && <p className="text-danger">No data found</p>}
            {filteredNumbers.length === 0 && <p className="text-danger">No data found</p>}
            {
              // Dynamic contacts
              filteredNumbers?.map((number) => (
                <ContactsList key={number.id} number={number}></ContactsList>
              ))
            }
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="fw-semibold"
            onClick={handleAllShow}
            style={{
              backgroundColor: "#46139f",
              borderColor: "#46139f"
            }}
          >
            All Contacts
          </Button>
          <Button
            variant="info"
            className="fw-semibold"
            onClick={handleUsOnlyShow}
            style={{
              backgroundColor: "#ff7f50",
              borderColor: "#ff7f50"
            }}
          >
            US Contacts
          </Button>
          <Button
            variant="light"
            onClick={handleClose}
            style={{
              borderColor: "#46139f"
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
