package servrlet;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String code = req.getParameter("itmCode");
        String description = req.getParameter("itemName");
        String unitPrice = req.getParameter("itemPrice");
        String qtyOnHand = req.getParameter("itemQty");

        PrintWriter writer = resp.getWriter();

        Connection connection = null;
        try {
            connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("INSERT INTO item VALUES(?,?,?,?)");
            pstm.setObject(1, code);
            pstm.setObject(2, description);
            pstm.setObject(3, unitPrice);
            pstm.setObject(4, qtyOnHand);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_CREATED);
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "item Add Success");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }

        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_OK);
            objectBuilder.add("status", 400);
            objectBuilder.add("message", "Error");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
            throwables.printStackTrace();
        } finally {
            try {
                connection.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
        JsonObjectBuilder dataMsgBuilder = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();

        Connection connection = null;

        try {
            connection = ds.getConnection();
            String option = req.getParameter("option");
            switch (option) {
                case "GetAll":
                    ResultSet resultSet = connection.prepareStatement("select * from item").executeQuery();
                    while (resultSet.next()) {
                        String itemId = resultSet.getString(1);
                        String itemName = resultSet.getString(2);
                        String itemPrice = resultSet.getString(3);
                        double qtyOnHand = resultSet.getDouble(4);

                        resp.setStatus(HttpServletResponse.SC_OK);//201

                        objectBuilder.add("itemId", itemId);
                        objectBuilder.add("itemName", itemName);
                        objectBuilder.add("itemPrice", itemPrice);
                        objectBuilder.add("qtyOnHand", qtyOnHand);

                        arrayBuilder.add(objectBuilder.build());
                    }

                    dataMsgBuilder.add("data", arrayBuilder.build());
                    dataMsgBuilder.add("massage", "Done");
                    dataMsgBuilder.add("status", "200");

                    writer.print(dataMsgBuilder.build());
                    break;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String itemId = req.getParameter("itemId");
        /*System.out.println("cus : " + " " + customerID);*/
        JsonObjectBuilder dataMsgBuilder = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();

        Connection connection = null;
        try {
            connection = ds.getConnection();
            PreparedStatement pstm = connection.prepareStatement("DELETE FROM item WHERE code=?");
            pstm.setObject(1, itemId);

            if (pstm.executeUpdate() > 0) {
                resp.setStatus(HttpServletResponse.SC_OK); //200
                dataMsgBuilder.add("data", "");
                dataMsgBuilder.add("massage", "item Deleted");
                dataMsgBuilder.add("status", "200");
                writer.print(dataMsgBuilder.build());
            }
        } catch (SQLException e) {
            dataMsgBuilder.add("status", 400);
            dataMsgBuilder.add("message", "Error");
            dataMsgBuilder.add("data", e.getLocalizedMessage());
            writer.print(dataMsgBuilder.build());
            resp.setStatus(HttpServletResponse.SC_OK); //200
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}