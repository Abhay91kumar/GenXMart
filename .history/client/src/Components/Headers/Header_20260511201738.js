<nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>

  <ul>

    <li>
      <Link
        to='/product'
        onClick={() => setIsMenuOpen(false)}
      >
        Shop
      </Link>
    </li>

    <li>
      <Link
        to='/mobile'
        onClick={() => setIsMenuOpen(false)}
      >
        Mobile & Tablet
      </Link>
    </li>

    <li>
      <Link
        to='/fashion'
        onClick={() => setIsMenuOpen(false)}
      >
        Fashion
      </Link>
    </li>

    {isLogged ? (
      <>
        <li>
          <Link
            to='/address'
            onClick={() => setIsMenuOpen(false)}
          >
            Address
          </Link>
        </li>

        <li>
          <Link
            to='/history'
            onClick={() => setIsMenuOpen(false)}
          >
            History
          </Link>
        </li>

        <li>
          <Link
            to='/cart'
            onClick={() => setIsMenuOpen(false)}
          >
            <MdOutlineAddShoppingCart size={20} />
            Cart ({cart.length})
          </Link>
        </li>

        {isAdmin && (
          <>
            <li>
              <Link
                to='/create_product'
                onClick={() => setIsMenuOpen(false)}
              >
                Create Product
              </Link>
            </li>

            <li>
              <Link
                to='/category'
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                to='/admin/dashboard'
                onClick={() => setIsMenuOpen(false)}
              >
                <MdAdminPanelSettings size={18} />
                Dashboard
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to='/' onClick={logOutUser}>
            Logout
          </Link>
        </li>
      </>
    ) : (
      <li>
        <button
          className="login-btn"
          onClick={() => {
            setShowLogin(true);
            setIsMenuOpen(false);
          }}
        >
          Login / Register
        </button>
      </li>
    )}

  </ul>

</nav>